import { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import ProductCard from "../components/products/productCard";
import useContract from "../hooks/useContract";
import toast from "react-hot-toast";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { formatUnits } from "ethers";
import Loading from "../components/ui/Loading";

const Products = () => {
  const { products } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [resProducts, setResProducts] = useState(null);

  const { isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    try {
      setIsLoading(true);
      const _products = async () => {
        const res_products = await products();
        // console.log(res_products);
        setResProducts(res_products);
        // console.log(res_products);
        setIsLoading(false);

        // set the products here

        // console.log(_products);
      };
      if (isConnected) {
        _products();
      }
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      toast.error("Error Fetching Products");
    }
  }, []);
  // console.log(resProducts);
  return (
    <Layout>
      <div className="container flex  mt-10 w-full flex-col items-center justify-center">
        {isLoading && (
          <div className="h-[60vh] w-[90vw] flex items-center justify-center">
            <Loading />
          </div>
        )}
        {resProducts === null && !isLoading && (
          <div className="h-[60vh] w-[90vw] flex items-center justify-center">
            <h3 className="text-secondary">No Products found</h3>
          </div>
        )}
        {!isLoading && (
          <div className="w-full  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {resProducts?.products.map((product, index) => (
              <ProductCard
                key={index}
                id={index}
                name={product[0]}
                price={formatUnits(product[2].toString(), 18)}
                stock={Number(product[1])}
                materialId={Number(product[4])}
                manufacturer={product[3]}
                // seller={}
                type="product"
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
