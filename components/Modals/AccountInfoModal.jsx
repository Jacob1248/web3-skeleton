import { useWeb3React } from "@web3-react/core";
import React,{ useEffect } from 'react'
import BaseModal from "./BaseModal";


function AccountInfoModal(props) {
  const { deactivate } = useWeb3React()
  
  useEffect(async () => {
  
    return () => {
    }
  },[])
  
  function openConnectionModal(){
    props.closeModal(false)
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
    props.closeModal(false)
  }

  return (
    <BaseModal {...props}>
      <span className='text-2xl text-center mb-2'>Account</span>
      <button className="border-2 rounded-xl w-36 border-black" onClick={openConnectionModal}>Switch Wallet</button>
      <button className="border-2 rounded-xl w-36 border-black mt-4" onClick={disconnectWallet}>Disconnect Wallet</button>
    </BaseModal>
  );
}

export default AccountInfoModal;