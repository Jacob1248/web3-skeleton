import { useWeb3React } from "@web3-react/core";
import React,{ useEffect } from 'react'
import { useSelector } from "react-redux";
import { CHAIN_ID_MAPPING } from "../../utils/constants";

function NavBar(props) {

  const { active, account, chainId } = useWeb3React()

  const counter = useSelector((reducer) => reducer.ethData.ethBalance)
  
  useEffect(() => {
    return () => {
      
    }
  })

  return (
      <nav className="w-full flex flex-row justify-between p-2 items-center z-50 relative">
        <span className="text-2xl">Zen Site</span>
        <div className="flex flex-row items-center">
            <button onClick={!active?props.toggleModal:()=>props.setAccountModalState(true)} className="font-bold py-1 px-2 border-2 border-black rounded-lg relative mr-4 max-w-xs overflow-hidden truncate" >  
              {
                active?
                  <b>{account.slice(0,5)+ "..." + account.slice(account.length-6,account.length-1)}</b>
                : 
                <>Connect</>
              }
            </button>
            {
                active?
                <span className="border-2 rounded-lg px-2 py-1 border-black mr-4">
                  {CHAIN_ID_MAPPING[chainId]}
                </span>
                :
                <></>
            }
            {
              active?
              <span className="border-2 rounded-lg px-2 py-1 border-black">
                {counter} ETH
              </span>
              :
              <></>
            }
        </div>
      </nav>
  );
}

export default NavBar;
