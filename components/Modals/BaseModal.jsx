import React from 'react'
import { XIcon } from '@heroicons/react/solid'


function BaseModal(props) {

  function returnChildWithProps(){
      let propTemp = {...props}
      delete propTemp.children
      return propTemp
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center absolute top-0 left-0 z-10'>
      <div className='flex flex-col content-center border-solid border-2 border-black-600  w-full lg:w-128 xl:w-128 md:w-128 rounded p-6 relative rounded-xl items-center'>
        {
            props.closeModal?
            <XIcon onClick={()=>props.closeModal(false)} className='w-5 h-5 absolute top-0 right-0 mt-2 mr-2 cursor-pointer'></XIcon>
            :
            <></>
        }
            {React.Children.map(props.children, (child) =>
            React.cloneElement(child, { ...returnChildWithProps,className:child.props.className })
            )}
      </div>
    </div>
  );
}

export default BaseModal;