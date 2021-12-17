import { useWeb3React } from "@web3-react/core";
import { returnConnector } from "../../utils/connectors";
import React,{ useEffect } from 'react'
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { XIcon } from '@heroicons/react/solid'


function AccountInfoModal(props) {
  const { active,activate,deactivate } = useWeb3React()
  
  useEffect(async () => {
  
    return () => {
    }
  },[])
  
  function openConnectionModal(){
    props.setAccountModalState(false)
    props.setModalState(true)
  }

  async function disconnect() {
    try {
      localStorage.removeItem('walletconnect')
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  function disconnectWallet(){
    disconnect();
    props.setAccountModalState(false)
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center absolute top-0 left-0 z-10'>
      <div className='flex flex-col content-center border-solid border-2 border-black-600 lg:w-128 xl:w-128 md:w-128 rounded p-6 relative rounded-xl items-center'>
        <XIcon onClick={()=>props.setAccountModalState(false)} className='w-5 h-5 absolute top-0 right-0 mt-2 mr-2 cursor-pointer'></XIcon>
        <span className='text-2xl text-center mb-2'>Account</span>
        <button className="border-2 rounded-xl w-36 border-black" onClick={openConnectionModal}>Switch Wallet</button>
        <button className="border-2 rounded-xl w-36 border-black mt-4" onClick={disconnectWallet}>Disconnect Wallet</button>
      </div>
    </div>
  );
}

export default AccountInfoModal;