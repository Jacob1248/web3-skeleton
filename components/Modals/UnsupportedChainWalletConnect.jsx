import React from 'react'
import BaseModal from './BaseModal';


function UnsupportedChainWalletConnect(props) {
  return (
    <BaseModal {...props}>
      <span className='text-2xl text-center mb-2'>Error</span>
      <span>{props.errorMessage}</span>
    </BaseModal>
  );
}

export default UnsupportedChainWalletConnect;