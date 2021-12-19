import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { returnConnector } from "../../utils/connectors";
import React from 'react'
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import Web3 from "web3";
import BaseModal from "./BaseModal";
import { useDispatch } from "react-redux";
import { WalletConnectError } from "../../redux/actions";

function ConnectModal(props) {
  const { activate,deactivate } = useWeb3React()
 
  const dispatch = useDispatch();

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
            await activate(connector)
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
                localStorage.removeItem('walletconnect');
                (new Web3(connector)).disconnect()
                await activate(connector)
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
        console.log(connector)
        await activate(connector,connectionErrorWalletConnect)
      }
    }catch (ex) {
      console.log(ex)
      alert(ex)
    }
    finally{
      props.closeModal(false);
    }
  }

  const connectionErrorWalletConnect = (error) =>{
    //call function to display error modal with error message
    if(error instanceof UserRejectedRequestError){
      return
    }
    if(error instanceof UnsupportedChainIdError){
      deactivate()
      // console.log(props)
      localStorage.removeItem('walletconnect')
      // props.toggleWalletConnectionError('An error occurred while connecting to your wallet!')
      // console.log("error",error)
      dispatch(WalletConnectError('An error occurred while connecting to your wallet!'))
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
        props.closeModal(false);
        deactivate()
      }
      else{
        alert('An error occurred while connecting to metamask!')
      }
  }

  return (
    <BaseModal {...props}>
        <span className='text-2xl text-center mb-2'>Account</span>
        <button onClick={()=>connect(0)} className='bg-orange-500 hover:bg-orange-700 w-full text-white font-bold py-2 px-4 rounded h-16 relative'>
          Metamask
          <div className='absolute bottom-0 right-0 w-auto 	'>
            <img src="metamask.svg"></img>
          </div>
        </button>
        <button onClick={()=>connect(1)} className='bg-blue-600 hover:bg-blue-900 w-full text-white font-bold py-2 px-4 rounded mt-4 relative h-16 overflow-hidden'>
          WalletConnect
          <div className='absolute bottom-0 right-0 w-auto -mr-4'>
            <img src="walletconnect.svg"></img>
          </div>
        </button>
    </BaseModal>
  );
}

export default ConnectModal;