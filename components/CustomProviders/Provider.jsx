import React, { useEffect } from 'react'
import { returnConnector } from '../../utils/connectors'
import { useWeb3React } from '@web3-react/core'
import { ALL_SUPPORTED_CHAIN_IDS_EXTENDED } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { MetamaskError, updateEthereumBalance } from '../../redux/actions'
import { convertToEther } from '../../utils/helpers'

function WalletProvider({ children }) {
  const { active, error, activate,connector,library,account,chainId } = useWeb3React()

  const dispatch = useDispatch();  

  useEffect(async () => {
    if(active){
      connector.on('Web3ReactUpdate', (id)=>{
        if(!ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes(id.chainId)){
          dispatch(MetamaskError())
        }
      });
      returnConnector(1).on('chainChanged', (id)=>{
        if(!ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes(id.chainId)){
          console.log('error')
        }
      });
      connector.on('handleUpdate', (id)=>{
        console.log('error')
        if(!ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes(id.chainId)){
          console.log('error')
        }
      });
      dispatch(updateEthereumBalance(await convertToEther(library,account)))
    }
    return () => {
    }
  }, [active])

  useEffect(async () => {
      try{
        let walletConnectAuthorized = await localStorage.getItem('walletconnect')
        if(walletConnectAuthorized!==null){
            if ( !active && !error ) {
                activate(returnConnector(1))
                return;
            }
        }
        let metamaskAuthorized = await returnConnector(0).isAuthorized();
        if(metamaskAuthorized){
            if (metamaskAuthorized && !active && !error) {
                // if(!ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes(await returnConnector(0).getChainId())){
                //   dispatch(MetamaskError());
                // }
                // else{
                    await activate(returnConnector(0))
                // }
            }
        }
      }
      catch(error){

      }
  }, [])

  return children
}

export default WalletProvider