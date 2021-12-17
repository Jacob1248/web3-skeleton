import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { returnConnector } from "../../utils/connectors";
import React,{ useEffect } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import Web3 from "web3";

function ConnectModal(props) {
  const { active,activate,deactivate,connector,chainID } = useWeb3React()
 
  useEffect(async () => {
    if(active){
      console.log(chainID)
    }
    return () => {
    }
  },[chainID])
  
  useEffect(async () => {
    if(active){
    }
    return () => {
    }
  },[active])

  async function connect(type) {
    try {
      if(type===0){
        if (window.ethereum) {
          try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x3' }], // chainId must be in hexadecimal numbers
            });
            let connector = returnConnector(0);
            localStorage.removeItem('walletconnect');
            await activate(connector,connectionError)
          } catch (error) {
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x3',
                      rpcUrl: 'https://ropsten.infura.io/v3/0699b7daf668433489f8f9d4c8d02727',
                    },
                  ],
                });
                let connector = returnConnector(0);
                console.log(connector)
                localStorage.removeItem('walletconnect');
                (new Web3(connector)).disconnect()
                await activate(connector,connectionError)
              } catch (addError) {
                console.error(addError);
              }
            }
            console.error(error);
          }
        } else {
          // if no window.ethereum then MetaMask is not installed
          alert('Please use a browser with metamask installed');
        } 
      }
      else{
        let connector = returnConnector(1);
        await activate(connector,connectionErrorWalletConnect)
      }
    }catch (ex) {
      console.log(ex)
      alert(ex)
    }
    finally{
      props.setModalState(false);
    }
  }

  const connectionErrorWalletConnect = (error) =>{
    //call function to display error modal with error message
    if(error instanceof UserRejectedRequestError){
      return
    }
    if(error instanceof UnsupportedChainIdError){
      deactivate()
      console.log(props)
      props.toggleWalletConnectionError('An error occurred while connecting to your wallet!')
      console.log("error",error)
    }
    else{
      alert('An error occurred while connecting to your wallet!')
    }
  }

  const connectionError = (error) =>{
      //call function to display error modal with error message
      if(error instanceof UserRejectedRequestError){
        return
      }
      if(error instanceof UnsupportedChainIdError){
        console.log("error",error)
        // props.setErrorShown(true);
        props.setModalState(false);
        deactivate()
      }
      else{
        alert('An error occurred while connecting to metamask!')
      }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center absolute top-0 left-0 z-10'>
      <div className='flex flex-col content-center border-solid border-2 border-black-600 lg:w-128 xl:w-128 md:w-128 rounded p-6 relative   rounded-xl'>
        <span className='text-2xl text-center mb-2'>Connect a Wallet</span>
        <XIcon onClick={()=>props.setModalState(false)} className='w-5 h-5 absolute top-0 right-0 mt-2 mr-2 cursor-pointer'></XIcon>
        <button onClick={()=>connect(0)} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded h-16 relative'>
          Metamask
          <div className='absolute bottom-0 right-0 w-auto 	'>
            <img src="metamask.svg"></img>
          </div>
        </button>
        <button onClick={()=>connect(1)} className='bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4 relative h-16 overflow-hidden'>
          WalletConnect
          <div className='absolute bottom-0 right-0 w-auto -mr-4'>
            <img src="walletconnect.svg"></img>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ConnectModal;