import React from 'react'
import { XIcon } from '@heroicons/react/solid'


function UnsupportedChainWalletConnect(props) {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center absolute top-0 left-0 z-10'>
      <div className='flex flex-col content-center border-solid border-2 border-black-600 lg:w-128 xl:w-128 md:w-128 rounded p-6 relative   rounded-xl'>
        <XIcon onClick={()=>props.toggleWalletConnectionError(false)} className='w-5 h-5 absolute top-0 right-0 mt-2 mr-2 cursor-pointer'></XIcon>
        <span className='text-2xl text-center mb-2'>Error</span>
        {props.errorMessage}
      </div>
    </div>
  );
}

export default UnsupportedChainWalletConnect;