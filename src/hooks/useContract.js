import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import toast from "react-hot-toast";
import {
  PHARMA_SUPPLY_CONTRACT,
  PHARMA_SUPPLY_ABI,
} from "../contracts/contracts";

function useContract() {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const getProvider = () => {
    return new BrowserProvider(walletProvider);
  };
  const getSigner = async (provider) => {
    return provider.getSigner();
  };

  const getContract = async (address, abi, signer) => {
    const contract = new Contract(address, abi, signer);
    return contract;
  };

  const auth = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );

    const registration = await contract.stakeholders(address);
    // console.log(registration.seller);
    return {
      isRegistered:
        registration.seller != "0x0000000000000000000000000000000000000000",
      type: registration.stake_holder_type,
    };
  };

  const stakeHolderProduct = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );
    const _totalProduct = await contract.stakeHoldersProducts();
    // console.log(_totalProduct);
    const products = [];
    for (let i = 0; i < Number(_totalProduct.length); i++) {
      const _product = await contract.products(Number(_totalProduct[i]));
      products.push(_product);
    }
    return {
      total: _totalProduct.length,
      products,
    };
  };

  const stakeHolderBuy = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );

    const _buys = await contract.stakeHoldersBuys();
    // console.log(_buys);
    // console.log(_buys.length);

    const buys = [];
    // console.log(0 < _buys.length);

    for (let i = 0; i < _buys.length; i++) {
      // console.log(i);
      // console.log("ok");
      const _buy = await contract.orders(Number(_buys[i]));
      buys.push(_buy);
    }
    // console.log(buys);
    return {
      total: _buys.length,
      buys,
    };
  };

  const stakeHolderSell = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );

    const _sells = await contract.stakeHolderSells();
    const sells = [];
    // console.log(_sells);
    for (let i = 0; i < Number(_sells.length); i++) {
      const _sell = await contract.orders(Number(_sells[i]));
      sells.push(_sell);
    }
    return {
      total: _sells,
      sells,
    };
  };

  const products = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );

    const _total_products = await contract.product_ids();
    const products = [];
    const ids = [];

    for (let i = 1; i < Number(_total_products); i++) {
      const _product = await contract.products(i);
      products.push(_product);
    }
    // console.log(products);
    return {
      total: _total_products,
      products,
    };
  };

  const registerStakeHolder = async (type) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );

    // register
    const trx = await contract.registerStakeHolder(type);
    // wait till the transaction finalizes.
    const receipt = await trx.wait();
  };

  const createProduct = async (name, stock, price, m_id) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );

    // convert to 18 decimals

    const priceAmount = parseUnits(price, 18);

    const trx = await contract.createProduct(name, stock, priceAmount, m_id);

    const receipt = await trx.wait();
  };

  const buyProduct = async (id, unit) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );

    // get the price

    const product = await contract.products(id + 1);
    // console.log(x[2]);

    const price = formatUnits(product[2], 18);
    // console.log(price);
    const total = Number(price) * Number(unit);
    // // console.log(total);

    const totalamount = parseUnits(total.toString(), 18);

    // console.log(id, unit, totalamount, product);
    const trx = await contract.buyProduct(id, unit, { value: totalamount });
    const receipt = await trx.wait();
    toast.success("Product bought successfully");
  };

  const deliverProduct = async (id) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );
    const trx = await contract.deliverProduct(id);
    const receipt = await trx.wait();
  };

  const track = async (id = 2) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      PHARMA_SUPPLY_CONTRACT,
      PHARMA_SUPPLY_ABI,
      signer
    );
    let _product = await contract.products(id);
    // console.log(_product);
    // console.log(Number(_product[4]));
    let _mat_id = Number(_product[4]);
    const _product_ids = [];
    const _products = [];
    _product_ids.push(id);
    while (1) {
      if (_mat_id === 0) {
        break;
      }
      _product_ids.push(_mat_id);
      _products.push(_product);
      _product = await contract.products(_mat_id);
      _mat_id = Number(_product[4]);
      // console.log(_mat_id);
    }
    _products.push(_product);
    // console.log(_products);
    return _products;
  };
  return {
    auth,
    stakeHolderProduct,
    stakeHolderBuy,
    stakeHolderSell,
    products,
    registerStakeHolder,
    createProduct,
    buyProduct,
    deliverProduct,
    track,
  };
}

export default useContract;
