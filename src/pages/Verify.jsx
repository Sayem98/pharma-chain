import toast from "react-hot-toast";
import Layout from "../components/layouts/Layout";
import ProductCard from "../components/products/productCard";
import RightArrow from "../components/ui/RightArrow";
import useContract from "../hooks/useContract";
import { useState } from "react";
import { formatUnits } from "ethers";
import Loading from "../components/ui/Loading";

const Products = () => {
  const { track } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    // console.log(parseInt(e.target[0].value));
    try {
      setIsLoading(true);
      const res = await track(parseInt(e.target[0].value));
      if (res[0][0] != "") {
        setProducts(res);
      } else {
        setProducts(null);
      }
      // console.log(res[0][0]);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error("Failed to track product");
    }
  };
  console.log(products);
  return (
    <Layout>
      <div className="container flex  mt-10 w-full flex-col items-center justify-center">
        <form onSubmit={handleTrackSubmit} className="input flex">
          <input
            type="number"
            required
            placeholder="Enter Product Id"
            className="w-full p-2 border text-secondary border-secondary/50 rounded-md focus:outline-none focus:ring-primary focus:border-primary transition-all duration-150"
          />
          {/* search button */}
          <button className="bg-primary text-white p-2 rounded-md ml-2">
            Track
          </button>
        </form>
        <div className="w-full  grid sm:grid-cols-2 md:grid-cols-3 mt-10 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {!isLoading &&
            products?.map((product, index) => (
              <div className="flex relative">
                {index != products.length - 1 && <RightArrow />}
                <ProductCard
                  id={index}
                  name={product[0]}
                  price={formatUnits(product[2].toString(), 18)}
                  stock={Number(product[1])}
                  materialId={Number(product[4])}
                  manufacturer={product[3]}
                  // name={"product 1"}
                  // price={0.1}
                  // stock={100}
                  // materialId={0}
                  // manufacturer={"293829480238083091284902384291084901"}
                  // seller={"293829480238083091284902384291084901"}
                  type="verify"
                />
              </div>
            ))}

          {isLoading && (
            <div className="w-[95vw] h-[50vh] flex items-center justify-center">
              <Loading />
            </div>
          )}
          {!isLoading && products == null && (
            <div className="w-[95vw] h-[50vh] flex items-center justify-center">
              <h2 className="text-secondary">No Products found</h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
