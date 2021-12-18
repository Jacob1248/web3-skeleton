import { useWeb3React } from "@web3-react/core";
import React,{ useState,useEffect } from 'react'
import ConnectModal from '../Modals/ConnectModal';
import NavBar from '../NavBar/NavBar';
import ConnectionErrorModal from "../Modals/ConnectionErrorModal";
import UnsupportedChainWalletConnect from "../Modals/UnsupportedChainWalletConnect";
import AccountInfoModal from "../Modals/AccountInfoModal";
import { ALL_SUPPORTED_CHAIN_IDS_EXTENDED } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { MetamaskError, updateEthereumBalance, WalletConnectError } from "../../redux/actions";
import { convertToEther } from "../../utils/helpers";

function ConnectionHandler({Component,pageProps}) {

  const [modalState,setModalState] = useState(false);

  const [accountModalState,setAccountModalState] = useState(false);

  const { active,connector,library,account,chainId,deactivate } = useWeb3React()

  const dispatch = useDispatch();

  function toggleModal(){
    if(!active)
      setModalState(!modalState)
  }

  const metamaskError = useSelector((reducer) => reducer.ethData.metamaskError)
  const walletConnectError = useSelector((reducer) => reducer.ethData.walletConnectError)

  useEffect(async () => {
    if(active){
      connector.on('Web3ReactUpdate', (id)=>{
        console.log(ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes(id.chainId))
        if(!ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes(id.chainId)){
          dispatch(MetamaskError())
        }
      });
      dispatch(updateEthereumBalance(await convertToEther(library,account)))
    }
    return () => {
    }
  }, [active])

  function walletConnectErrorToggle(message){
    dispatch(WalletConnectError(!message?null:message))
  }

  return (
    <div className='relative flex flex-col'>
      {
        metamaskError?<ConnectionErrorModal></ConnectionErrorModal>
        :
        <>
          <NavBar toggleModal={toggleModal} setAccountModalState={setAccountModalState}></NavBar>
          {
            modalState?<ConnectModal closeModal={setModalState} toggleWalletConnectionError={walletConnectErrorToggle}></ConnectModal>:<></>
          }
          {
            accountModalState?<AccountInfoModal closeModal={setAccountModalState} setModalState={setModalState}></AccountInfoModal>:<></>
          }
          <Component {...pageProps}/>
        </>
      }
      {
        walletConnectError!==null?<UnsupportedChainWalletConnect closeModal={walletConnectErrorToggle} errorMessage={walletConnectError}></UnsupportedChainWalletConnect>:<></>
      }
    </div>
  );
}

export default ConnectionHandler;
