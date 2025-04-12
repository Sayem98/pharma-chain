import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Products from "../pages/products";
import Register from "../pages/Register";
import Verify from "../pages/Verify";
import Shop from "../pages/Shop";
import { useState } from "react";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useContract from "./../hooks/useContract";
import { useEffect } from "react";

export default function Router() {
  const { address, isConnected } = useWeb3ModalAccount();
  const { auth, stakeHolderProduct } = useContract();
  const [authData, setAuthData] = useState({});

  useEffect(() => {
    const _auth = async () => {
      const _auth_data = await auth();
      const _stakeholder_product = await stakeHolderProduct();

      // console.log(_auth_data);
      setAuthData(_auth_data);
      // console.log(_stakeholder_product);
    };
    if (address) {
      _auth();
    }
  }, [address]);

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/register" element={<Register />} />
      {authData?.isRegistered && (
        <>
          <Route path="/track" element={<Verify />} />
          <Route path="/shop" element={<Shop />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
