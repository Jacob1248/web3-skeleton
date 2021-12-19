import React, { useEffect } from 'react'
import { returnConnector } from '../../utils/connectors'
import { useWeb3React } from '@web3-react/core'
import { ALL_SUPPORTED_CHAIN_IDS_EXTENDED } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { MetamaskError, updateEthereumBalance, WalletConnectError } from '../../redux/actions'
import { convertToEther } from '../../utils/helpers'
import { useSelector } from 'react-redux'

function WalletProvider({ children }) {
  const { active, error, activate,connector,library,account,chainId } = useWeb3React()

  const dispatch = useDispatch();  
  const metamaskError = useSelector((reducer) => reducer.ethData.metamaskError)
  const walletConnectError = useSelector((reducer) => reducer.ethData.walletConnectError)

  useEffect(async () => {
    if(active){
      connector.on('Web3ReactUpdate', (id)=>{
        if(!ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes(id.chainId)){
          localStorage.removeItem('walletconnect')
          if(connector.walletConnectProvider && !walletConnectError){
            localStorage.removeItem('walletconnect')
            dispatch(WalletConnectError())
          }
          else if(!metamaskError){
            dispatch(MetamaskError())
          }
        }
        else{
          if(metamaskError){
            dispatch(MetamaskError())
          }
          else if(walletConnectError){
            dispatch(WalletConnectError())
          }
        }
      });
      if(!metamaskError && !walletConnectError){
        dispatch(updateEthereumBalance(await convertToEther(library,account)))
      }
    }
    return () => {
    }
  }, [active])

  useEffect(async () => {
      try{
        let walletConnectAuthorized = await localStorage.getItem('walletconnect')
        if(walletConnectAuthorized!==null){
            if ( !active && !error ) {
                await activate(returnConnector(1))
                return;
            }
        }
        let metamaskAuthorized = await returnConnector(0).isAuthorized();
        if(metamaskAuthorized){
            if (!active && !error) {
                if(!ALL_SUPPORTED_CHAIN_IDS_EXTENDED.includes(await returnConnector(0).getChainId())){
                  dispatch(MetamaskError());
                }
                else{
                    await activate(returnConnector(0))
                }
            }
        }
      }
      catch(error){

      }
  }, [])

  return children
}

export default WalletProvider