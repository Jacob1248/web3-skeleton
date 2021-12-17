import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { returnConnector } from "../../utils/connectors";
import React,{ useEffect } from 'react'
import { UserRejectedRequestError } from "@web3-react/injected-connector";


function ConnectionErrorModal(props) {
  const { active,activate,deactivate } = useWeb3React()
  
  useEffect(async () => {
    if(active){
      console.log(active,'here')
      props.toggleErrorModal()
    }
    return () => {
    }
  },[active])

  async function connect() {
    try {
      if (window.ethereum) {
           try {
             await window.ethereum.request({
               method: 'wallet_switchEthereumChain',
               params: [{ chainId: '0x3' }],
             });
             let connector = returnConnector(0);
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
                 await activate(connector,connectionError)
               } catch (addError) {
                 console.error(addError);
               }
             }
             console.error(error);
           }
         } else {
           alert('Please use a browser with metamask installed');
         } 
    } catch (ex) {
      console.log(ex)
      alert(ex)
    }
  }

  const connectionError = (error) =>{
      //call function to display error modal with error message
      if(error instanceof UserRejectedRequestError){
        return
      }
      if(error instanceof UnsupportedChainIdError){
        // props.setErrorShown(true);
        deactivate()
      }
      else{
        alert('An error occurred while connecting to metamask!')
      }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center absolute top-0 left-0 z-10'>
      <div className='flex flex-col content-center border-solid border-2 border-black-600 lg:w-128 xl:w-128 md:w-128 rounded p-6 relative   rounded-xl'>
        <span className='text-2xl text-center mb-2'>Error</span>
        An error occured while connecting to the wallet, please click below to connect to the ethereum mainnet
        
        <button onClick={()=>connect()} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded h-16 relative'>
          Metamask
          <div className='absolute bottom-0 right-0 w-auto 	'>
            <img src="metamask.svg"></img>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ConnectionErrorModal;