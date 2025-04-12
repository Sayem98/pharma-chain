import React from "react";
import { AiOutlineMedicineBox } from "react-icons/ai";
import useContract from "../../hooks/useContract";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../ui/Loading";
const productCard = ({
  id,
  name,
  price,
  stock,
  materialId,
  manufacturer,
  seller,
  type,
}) => {
  const { buyProduct } = useContract();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyClick = async (e) => {
    e.preventDefault();
    const quantity = parseInt(e.target[0].value);
    // convert quantity to integer

    // console.log(quantity, id);
    try {
      setIsLoading(true);
      await buyProduct(id, quantity);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("Failed to buy product");
      console.log(err);
    }
  };

  // console.log(id);

  return (
    <div className="border cursor-pointer p-3 bg-bg_secondary rounded-md  w-full transition-all duration-150">
      <div className="icon w-full flex items-center  justify-center">
        <AiOutlineMedicineBox className="w-10 h-20 text-primary" />
      </div>
      <div className="infos w-full">
        <h4 className="text-center text-secondary">{name}</h4>

        <div className="w-full flex items-center justify-between py-2 my-2">
          <p className="text-secondary">Price: {price}</p>
          <p className="text-secondary">Stock: {stock}</p>
        </div>

        <div className="w-full my-2  flex flex-col text-secondary">
          <div className="w-full border-t border-t-secondary/50 py-0.5 flex items-center justify-between">
            <p>Material Id:</p>
            <p>{materialId}</p>
          </div>
          <div className="w-full border-t border-t-secondary/50 py-0.5 flex items-center justify-between">
            <p>manufacturer:</p>
            <p>
              {manufacturer?.substring(0, 6) +
                "***" +
                manufacturer?.substring(
                  manufacturer.length - 4,
                  manufacturer.length
                )}
            </p>
          </div>
          {/* <div className="w-full border-t border-t-secondary/50 py-0.5 flex items-center justify-between">
            <p>Seller:</p>
            <p>
              {seller?.substring(0, 6) +
                "***" +
                seller?.substring(seller.length - 4, seller.length)}
            </p>
          </div> */}
        </div>

        <div className="actions w-full">
          {type === "product" && (
            <form onSubmit={handleBuyClick} className="flex gap-1">
              <input
                type="number"
                placeholder="Ex: 1"
                required
                min={1}
                className="w-full h-8 border text-secondary border-secondary/50 rounded-md focus:outline-none focus:ring-primary focus:border-primary transition-all duration-150"
              />
              <button
                disabled={isLoading}
                className="w-full bg-primary text-white rounded-md flex items-center justify-center disabled:bg-secondary"
              >
                {isLoading ? <Loading height={20} width={20} /> : "Buy"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default productCard;
