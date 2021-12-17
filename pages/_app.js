import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import '../styles/globals.css'
import React from 'react'
import WalletProvider from '../components/CustomProviders/Provider'
import ConnectionHandler from '../components/CustomProviders/ConnectionHandler'

function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {
  
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <ConnectionHandler Component={Component} pageProps={pageProps}/>
      </WalletProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;