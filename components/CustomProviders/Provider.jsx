import React, { useEffect } from 'react'
import { returnConnector } from '../../utils/connectors'
import { useWeb3React } from '@web3-react/core'
import { ALL_SUPPORTED_CHAIN_IDS_EXTENDED } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { MetamaskError } from '../../redux/actions'

function WalletProvider({ children }) {
  const { active, error, activate } = useWeb3React()

  const dispatch = useDispatch();

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