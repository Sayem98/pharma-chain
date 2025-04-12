import Layout from "../components/layouts/Layout";
import { Tab } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import useContract from "../hooks/useContract";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import Loading from "../components/ui/Loading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { auth, registerStakeHolder, createProduct } = useContract();
  const [authData, setAuthData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const _auth = async () => {
      const _auth_data = await auth();
      // const _stakeholder_product = await stakeHolderProduct();

      // console.log(_auth_data);
      // console.log(_stakeholder_product);
      setAuthData(_auth_data);
    };
    if (address) {
      _auth();
    }
  }, [address]);

  const handleSteakHolderRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(e.target[0].value);
    // console.log("registering");
    try {
      await registerStakeHolder(e.target[0].value);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      toast.error("Error Registering");
    }
  };

  const handleProductRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // console.log(e.target[0].value);
      // console.log(e.target[1].value);
      // console.log(e.target[2].value);
      // console.log(e.target[3].value);
      // console.log("registering");
      await createProduct(
        e.target[0].value,
        e.target[1].value,
        e.target[2].value,
        e.target[3].value
      );

      setIsLoading(false);
      toast.success("Product Registered");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      toast.error("Error Registering Product");
    }
  };

  return (
    <Layout>
      <div className="container flex  mt-10 w-full flex-col items-center justify-center">
        <Tab.Group>
          <Tab.List>
            {authData?.isRegistered && (
              <Tab as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button
                    className={
                      selected
                        ? "bg-primary px-3 py-2  text-white"
                        : "bg-bg_secondary text-secondary px-3 py-2 "
                    }
                  >
                    product
                  </button>
                )}
              </Tab>
            )}

            {!authData?.isRegistered && (
              <Tab as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button
                    className={
                      selected
                        ? "bg-primary px-3 py-2  text-white"
                        : "bg-bg_secondary text-secondary px-3 py-2 "
                    }
                  >
                    Stakeholder
                  </button>
                )}
              </Tab>
            )}
          </Tab.List>
          <Tab.Panels>
            {authData?.isRegistered && (
              <Tab.Panel>
                <form
                  onSubmit={handleProductRegister}
                  className=" mt-10 md:w-96"
                >
                  {/* register product with product name, manufacturer address,stock,price and material_id */}
                  <div className="input flex">
                    <input
                      type="text"
                      required
                      placeholder="Enter Product Name"
                      className="w-full p-2 border text-secondary border-secondary/50 rounded-md focus:outline-none focus:ring-primary focus:border-primary transition-all duration-150"
                    />
                  </div>

                  <div className="input flex mt-2">
                    <input
                      type="number"
                      required
                      placeholder="Enter Stock"
                      className="w-full p-2 border text-secondary border-secondary/50 rounded-md focus:outline-none focus:ring-primary focus:border-primary transition-all duration-150"
                    />
                  </div>

                  <div className="input flex mt-2">
                    <input
                      type="number"
                      required
                      // enable float
                      step="0.00001"
                      placeholder="Enter Price"
                      className="w-full p-2 border text-secondary border-secondary/50 rounded-md focus:outline-none focus:ring-primary focus:border-primary transition-all duration-150"
                    />
                  </div>

                  <div className="input flex mt-2">
                    <input
                      type="text"
                      required
                      placeholder="Enter Material Id"
                      className="w-full p-2 border text-secondary border-secondary/50 rounded-md focus:outline-none focus:ring-primary focus:border-primary transition-all duration-150"
                    />
                  </div>

                  <div className="actions w-full mt-2">
                    <button
                      disabled={isLoading}
                      className="w-full bg-primary text-white py-1 rounded-md flex items-center justify-center disabled:bg-bg_secondary"
                    >
                      {isLoading ? (
                        <Loading height={20} width={20} />
                      ) : (
                        "Add Product"
                      )}
                    </button>
                  </div>
                </form>
              </Tab.Panel>
            )}
            {/* stakeholder */}
            {!authData?.isRegistered && (
              <Tab.Panel>
                <form
                  onSubmit={handleSteakHolderRegister}
                  className=" mt-10 md:w-96"
                >
                  {/* register product with product name, manufacturer address,stock,price and material_id */}
                  <div className="input flex">
                    <input
                      type="text"
                      required
                      minLength="2"
                      placeholder="Enter Stakeholder Type"
                      className="w-full p-2 border text-secondary border-secondary/50 rounded-md focus:outline-none focus:ring-primary focus:border-primary transition-all duration-150"
                    />
                  </div>

                  <div className="actions w-full mt-2">
                    <button
                      disabled={isLoading}
                      className="w-full bg-primary text-white py-1 rounded-md flex items-center justify-center disabled:bg-bg_secondary"
                    >
                      {isLoading ? (
                        <Loading height={20} width={20} />
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                </form>
              </Tab.Panel>
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  );
};

export default Register;
