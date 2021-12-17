import { InjectedConnector, } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ALL_SUPPORTED_CHAIN_IDS } from './constants';

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
                rpc: { 3: `https://ropsten.infura.io/v3/0699b7daf668433489f8f9d4c8d02727`},
                qrcode:true,
                infuraId:'0699b7daf668433489f8f9d4c8d02727',
                pollingInterval:100
            });;
        }
    }
}