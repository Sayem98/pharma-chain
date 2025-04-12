import { NavLink } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useContract from "../../hooks/useContract";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { auth, stakeHolderProduct } = useContract();
  const [authData, setAuthData] = useState({});

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

  return (
    <div className=" flex flex-col h-screen bg-bg  ">
      <div className="navbar flex h-20 bg-bg_secondary ">
        <div className="text-secondary container flex items-center justify-end">
          {/* nav links */}
          <div className="mx-4">
            {/* products */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-primary navLink"
                  : "navLink"
              }
            >
              Products
            </NavLink>

            {isConnected && (
              <>
                {/* register */}
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold border-primary navLink"
                      : "navLink"
                  }
                >
                  Register
                </NavLink>

                {authData?.isRegistered && (
                  <>
                    {/* track */}
                    <NavLink
                      to="/track"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary font-bold border-primary navLink"
                          : "navLink"
                      }
                    >
                      Track
                    </NavLink>

                    {/* My Inventory & products */}
                    <NavLink
                      to="/shop"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary font-bold  border-b-primary navLink"
                          : "navLink"
                      }
                    >
                      shop
                    </NavLink>
                  </>
                )}
              </>
            )}
          </div>
          <button
            className="rounded-md bg-bg px-3 py-2 "
            onClick={
              isConnected ? () => open("Account") : () => open("Connect")
            }
          >
            {isConnected
              ? address.substring(0, 6) +
                "***" +
                address?.substring(address.length - 4, address.length)
              : "connect wallet"}
          </button>
        </div>
      </div>
      <div className="grow max-h-[90vh] overflow-y-scroll">{children}</div>
    </div>
  );
};

export default Layout;
