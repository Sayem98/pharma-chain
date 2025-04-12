import Layout from "../components/layouts/Layout";
import Order from "../components/orders/Order";
import MyProduct from "../components/products/MyProduct";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./../components/ui/Loading";
import useContract from "../hooks/useContract";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { formatUnits } from "ethers";
import toast from "react-hot-toast";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [myProducts, setMyProducts] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrdersIds, setSellOrdersIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const orders = ["buy", "sell"];
  const selectedOrder = searchParams.get("orders") || "buy";
  const handleFilterClick = (role) => {
    searchParams.set("orders", role);
    setSearchParams(searchParams);
  };

  const { address, isConnected } = useWeb3ModalAccount();

  const { stakeHolderProduct, stakeHolderBuy, stakeHolderSell } = useContract();

  useEffect(() => {
    const _getMyProduct = async () => {
      setIsLoading(true);
      stakeHolderProduct()
        .then((data) => {
          // console.log("My poduct: ", data.products);
          setMyProducts(data.products);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          // console.log(err);
          toast.error("Failed to fetch products");
        });
    };
    if (isConnected) _getMyProduct();
  }, [address]);

  useEffect(() => {
    const _buyOrSellProducts = async () => {
      setIsLoading(true);
      if (selectedOrder === "buy") {
        const _buyProducts = await stakeHolderBuy();
        // console.log(_buyProducts.buys);
        setBuyOrders(_buyProducts.buys);
      } else {
        const _sellProducts = await stakeHolderSell();
        // console.log(_sellProducts.sells);
        setSellOrders(_sellProducts.sells);
        setSellOrdersIds(_sellProducts.total);
      }

      setIsLoading(false);
    };
    if (isConnected) {
      _buyOrSellProducts();
    }
  }, [address, selectedOrder]);

  // console.log(sellOrders, buyOrders);
  // console.log(sellOrdersIds);

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center">
        {isLoading && (
          <div className="h-[90vh] w-[90vw] flex items-center justify-center">
            <Loading />
          </div>
        )}

        {!isLoading && (
          <>
            {/* my products */}
            <div className="container mt-2">
              <h2 className="my-3  font-bold text-secondary">My Products</h2>
              <div className="w-full mt-6 grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {myProducts?.map((product, index) => (
                  <MyProduct
                    key={index}
                    name={product[0]}
                    material_id={Number(product[4])}
                    price={Number(formatUnits(product[2].toString(), 18))}
                    stock={Number(product[1])}
                    manufacturer={
                      product[3].substring(0, 4) +
                      "***" +
                      product[3].substring(
                        product[3].length - 4,
                        product[3].length
                      )
                    }
                  />
                ))}
                {myProducts.length == 0 && (
                  <h3 className="text-secondary">No Products found</h3>
                )}
              </div>
            </div>

            {/* Orders */}
            <div className="container mt-8">
              <h2 className="mt-3  font-bold text-secondary">Orders</h2>
              <div className="w-full flex justify-end">
                <div className="mt-2 flex h-full rounded-full  border border-black/5 bg-bg_secondary  filter dark:border-white/5 dark:bg-bg_dark_secondary">
                  {orders.map((order) => (
                    <button
                      key={order}
                      onClick={() => handleFilterClick(order)}
                      className={`relative h-full cursor-pointer rounded-full px-4   py-1.5  text-secondary transition-all duration-200 hover:text-primary  `}
                    >
                      {order === selectedOrder && (
                        <div
                          className="absolute inset-0 bg-primary  text-white"
                          style={{
                            borderRadius: "9999px",
                          }}
                          // transition={{ duration:5 }}
                        ></div>
                      )}
                      <span
                        className={`relative z-10  ${
                          order === selectedOrder
                            ? "text-white hover:text-white"
                            : ""
                        } transition-all duration-300`}
                      >
                        {order}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full mt-2 grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {selectedOrder === "buy"
                  ? buyOrders?.map((buy, index) => (
                      <Order
                        key={index}
                        buyer={buy[0]}
                        product_id={Number(buy[1])}
                        status={buy[2]}
                        buy_unit={Number(buy[3])}
                        buy_date={new Date(Number(buy[4]) * 1000)}
                        type="buy"
                      />
                    ))
                  : sellOrders?.map((buy, index) => (
                      <Order
                        key={index}
                        buyer={buy[0]}
                        product_id={Number(buy[1])}
                        status={buy[2]}
                        buy_unit={Number(buy[3])}
                        buy_date={new Date(Number(buy[4]) * 1000)}
                        type="sell"
                        order_id={sellOrdersIds[index]}
                      />
                    ))}
                {buyOrders.length == 0 && selectedOrder == "buy" && (
                  <h3 className="text-secondary">No Orders found</h3>
                )}
                {sellOrders.length == 0 && selectedOrder == "sell" && (
                  <h3 className="text-secondary">No Orders found</h3>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Shop;
