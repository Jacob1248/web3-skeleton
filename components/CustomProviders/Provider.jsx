import React, { useEffect } from 'react'
import { returnConnector } from '../../utils/connectors'
import { useWeb3React } from '@web3-react/core'
import { ALL_SUPPORTED_CHAIN_IDS } from '../../utils/constants'

function WalletProvider({ children }) {
  const { active, error, activate,connector } = useWeb3React()

  useEffect(async () => {
      try{
        let walletConnectAuthorized = await localStorage.getItem('walletconnect')
        if(walletConnectAuthorized!==null){
            if ( !active && !error) {
                activate(returnConnector(1))
                return;
            }
        }
        let metamaskAuthorized = await returnConnector(0).isAuthorized();
        if(metamaskAuthorized){
            if (metamaskAuthorized && !active && !error) {
                activate(returnConnector(0))
            }
        }
      }
      catch(error){

      }
  }, [])

  return children
}

export default WalletProvider