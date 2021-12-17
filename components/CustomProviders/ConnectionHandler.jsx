import { useWeb3React } from "@web3-react/core";
import React,{ useState,useEffect } from 'react'
import ConnectModal from '../ConnectModal/ConnectModal';
import NavBar from '../NavBar/NavBar';
import ConnectionErrorModal from "../ConnectModal/ConnectionErrorModal";
import UnsupportedChainWalletConnect from "../ConnectModal/UnsupportedChainWalletConnect";
import AccountInfoModal from "../ConnectModal/AccountInfoModal";
import { ALL_SUPPORTED_CHAIN_IDS_EXTENDED } from "../../utils/constants";

function ConnectionHandler({Component,pageProps}) {

  const [modalState,setModalState] = useState(false);

  const [walletconnecterror,setConnectionError] = useState(false);

  const [accountModalState,setAccountModalState] = useState(false);

  const { active,connector } = useWeb3React()

  const [errorShown,setErrorShown] = useState(false);

  function toggleModal(){
    if(!active)
      setModalState(!modalState)
  }

  useEffect(() => {
    if(active){
      connector.on('Web3ReactUpdate', (id)=>{
        if(!ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes[id]){
          setErrorShown(true)
        }
      });
    }
    return () => {
    }
  }, [active])

  useEffect(async () => {
    return () => {
    }
  },[walletconnecterror])

  function toggleErrorModal(){
    setErrorShown(!errorShown);
  }

  function connectionErrorToggle(e){
    console.log(e)
    setConnectionError(e);
  }

  return (
    <div className='relative flex flex-col'>
      {
        errorShown?<ConnectionErrorModal setErrorShown={setErrorShown} toggleErrorModal={toggleErrorModal}></ConnectionErrorModal>
        :
        <>
          <NavBar toggleModal={toggleModal} setErrorShown={setErrorShown} setAccountModalState={setAccountModalState}></NavBar>
          {
            modalState?<ConnectModal setModalState={setModalState} toggleWalletConnectionError={connectionErrorToggle} setErrorShown={setErrorShown} toggleModal={toggleModal}></ConnectModal>:<></>
          }
          {
            accountModalState?<AccountInfoModal setAccountModalState={setAccountModalState} setModalState={setModalState}></AccountInfoModal>:<></>
          }
          <Component {...pageProps}/>
      </>
      }
      {
        walletconnecterror?<UnsupportedChainWalletConnect toggleWalletConnectionError={connectionErrorToggle} errorMessage={walletconnecterror}></UnsupportedChainWalletConnect>:<></>
      }
    </div>
  );
}

export default ConnectionHandler;
