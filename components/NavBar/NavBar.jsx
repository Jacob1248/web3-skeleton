import { useWeb3React } from "@web3-react/core";
import React,{ useEffect } from 'react'

function NavBar(props) {
  const { active, account, deactivate } = useWeb3React()

  async function disconnect() {
    try {
      localStorage.removeItem('walletconnect')
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
      <nav className="w-full flex flex-row justify-between p-2 items-center z-50 relative">
        <span className="text-2xl">Zen Site</span>
        <div>
            <button onClick={!active?props.toggleModal:()=>props.setAccountModalState(true)} className="font-bold py-1 px-2 border-2 border-black  rounded-3xl relative mr-4 max-w-xs overflow-hidden truncate" >
              {
                active?
                  <b>{account.slice(0,5)+ "..." + account.slice(account.length-6,account.length-1)}</b>
                : 
                <>Connect</>
              }
            </button>
            {/* <button className="font-bold py-1 px-4 border-2 border-black  rounded-3xl relative" onClick={disconnect} >Disconnect</button> */}
        </div>
      </nav>
  );
}

export default NavBar;
