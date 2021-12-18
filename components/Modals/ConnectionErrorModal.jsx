import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { returnConnector } from "../../utils/connectors";
import React,{ useEffect } from 'react'
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import BaseModal from "./BaseModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MetamaskError } from "../../redux/actions";


function ConnectionErrorModal(props) {

  const { active,activate,deactivate } = useWeb3React()

  const dispatch = useDispatch();
  
  useEffect(async () => {
    if(active){
      console.log(active,'here')
      dispatch(MetamaskError())
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
    <BaseModal {...props}>
      <span className='text-2xl text-center mb-2'>Error</span>
      <span>An error occured while connecting to the wallet, please click below to connect to the ethereum mainnet</span>      
      <button onClick={connect} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded h-16 relative'>
        Metamask
        <div className='absolute bottom-0 right-0 w-auto 	'>
          <img src="metamask.svg"></img>
        </div>
      </button>
    </BaseModal>
  );
}

export default ConnectionErrorModal;