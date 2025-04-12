import { AiOutlineMedicineBox } from "react-icons/ai";

const MyProduct = ({ name, material_id, price, stock, manufacturer }) => {
  return (
    <div className="bg-bg_secondary  w-full flex">
      <div className="icon">
        <AiOutlineMedicineBox className="w-20 h-20 p-4 bg-primary text-white" />
      </div>
      <div className="grow px-3 py-1">
        <div className="">
          <div className="flex items-center justify-between">
            <h6 className="text-secondary font-bold">{name}</h6>
            <h6 className="text-secondary">Material Id: {material_id}</h6>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex mt-1 text-secondary flex-col">
              <small>manufacturer: {manufacturer}</small>
            </div>

            <div className="right text-secondary flex flex-col">
              <small>Price: ${price}</small>
              <small>Stock: {stock}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
