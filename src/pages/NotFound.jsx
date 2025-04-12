import { Link } from "react-router-dom";
import not_found from "../assets/not_found.svg";
const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-bg ">
      <img src={not_found} alt="" />
      <Link to={"/"} className="mt-5 animate-bounce font-bold text-primary">
        go to home?{" "}
      </Link>
    </div>
  );
};

export default NotFound;
