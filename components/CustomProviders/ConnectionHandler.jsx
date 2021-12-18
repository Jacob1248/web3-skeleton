import { useWeb3React } from "@web3-react/core";
import React,{ useState } from 'react'
import ConnectModal from '../Modals/ConnectModal';
import NavBar from '../NavBar/NavBar';
import ConnectionErrorModal from "../Modals/ConnectionErrorModal";
import UnsupportedChainWalletConnect from "../Modals/UnsupportedChainWalletConnect";
import AccountInfoModal from "../Modals/AccountInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { MetamaskError, WalletConnectError } from "../../redux/actions";

function ConnectionHandler({Component,pageProps}) {

  const [modalState,setModalState] = useState(false);

  const [accountModalState,setAccountModalState] = useState(false);

  const { active } = useWeb3React()

  const dispatch = useDispatch();

  function toggleModal(){
    if(!active)
      setModalState(!modalState)
  }

  const metamaskError = useSelector((reducer) => reducer.ethData.metamaskError)
  const walletConnectError = useSelector((reducer) => reducer.ethData.walletConnectError)

  function walletConnectErrorToggle(message){
    dispatch(WalletConnectError(!message?null:message))
  }

  return (
    <div className='relative flex flex-col'>
      <NavBar toggleModal={toggleModal} setAccountModalState={setAccountModalState}></NavBar>
      {
        modalState?<ConnectModal closeModal={setModalState} toggleWalletConnectionError={walletConnectErrorToggle}></ConnectModal>:<></>
      }
      {
        accountModalState?<AccountInfoModal closeModal={setAccountModalState} setModalState={setModalState}></AccountInfoModal>:<></>
      }
      {
        metamaskError?<ConnectionErrorModal closeModal={()=>dispatch(MetamaskError(false))}></ConnectionErrorModal>:<></>
      }
      <Component {...pageProps}/>
      {
        walletConnectError!==null?<UnsupportedChainWalletConnect closeModal={walletConnectErrorToggle} errorMessage={walletConnectError}></UnsupportedChainWalletConnect>:<></>
      }
    </div>
  );
}

export default ConnectionHandler;
