import { CiShoppingCart } from "react-icons/ci";
import { useState } from "react";
import Loading from "../ui/Loading";
import useContract from "../../hooks/useContract";
import toast from "react-hot-toast";

const Order = ({
  type,
  buyer,
  product_id,
  status,
  buy_unit,
  buy_date,
  order_id,
}) => {
  // console.log(buy_date.toString());
  // console.log(status);
  const [isLoading, setIsLoading] = useState(false);
  const { deliverProduct } = useContract();

  const handleDeliver = async () => {
    setIsLoading(true);
    try {
      await deliverProduct(order_id);
      setIsLoading(false);
      toast.success("Product delivered successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to deliver product");
    }
  };
  return (
    <div className="bg-bg_secondary  w-full flex">
      <div className="icon">
        <CiShoppingCart className="w-16 h-16 p-4 bg-primary text-white" />
      </div>
      <div className="grow px-3 py-1">
        <div className="">
          <div className="flex items-center justify-between">
            <h6 className="text-secondary text-sm font-bold">
              Product Id: #{product_id}
            </h6>
            <h6 className="text-secondary text-sm font-bold">
              Date:{" "}
              {buy_date.getFullYear() +
                "/" +
                buy_date.getMonth() +
                "/" +
                buy_date.getDate()}
            </h6>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex  text-secondary flex-col">
              <small>
                Buyer:{" "}
                {buyer.substring(0, 4) +
                  "***" +
                  buyer.substring(buyer.length - 4, buyer.length)}
              </small>
              <small>Buy Unit: {buy_unit}</small>
            </div>

            <div className="right text-secondary flex flex-col">
              <small className="text-primary font-bold">
                {Number(status) === 0 ? "pending" : "delivered"}
              </small>
              {type == "sell" && Number(status) === 0 && (
                // button to delivery
                <button
                  onClick={handleDeliver}
                  disabled={isLoading}
                  className="bg-primary flex items-center justify-center disabled:bg-secondary p-0.5 text-white rounded-md text-xs font-bold px-2"
                >
                  {isLoading ? <Loading height={15} width={15} /> : "Deliver"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
