import { InjectedConnector, } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ALL_SUPPORTED_CHAIN_IDS, INFURIA_ID, ROPSTEN_RPC_URL } from './constants';

export const returnConnector = (type) =>{
    switch(type){
        case 0:{
            console.log('returning metamask')
            return new InjectedConnector({
                supportedChainIds: ALL_SUPPORTED_CHAIN_IDS
            });
        }
        case 1:{
            console.log('returning walletconnect')
            return new WalletConnectConnector({
                supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
                rpc: { 3: ROPSTEN_RPC_URL},
                qrcode:true,
                infuraId:INFURIA_ID,
                pollingInterval:100
            });
        }
    }
}