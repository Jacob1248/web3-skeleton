import { configureStore } from '@reduxjs/toolkit'
import { METAMASK_ERROR_POPUP, UPDATE_ETH_BALANCE, WALLETCONNECT_ERROR_POPUP } from './actions'

const initialState = { 
  ethBalance: 0,
  metamaskError:false,
  walletConnectError:null
}

function ethReducer(state = initialState, action) {
  switch(action.type){
    case(UPDATE_ETH_BALANCE):{
      return {
        ...state,
        ethBalance: action.payload
      }
    }
    case(METAMASK_ERROR_POPUP):{
      return {
        ...state,
        metamaskError: !state.metamaskError
      }
    }
    case(WALLETCONNECT_ERROR_POPUP):{
      return {
        ...state,
        walletConnectError: action.payload
      }
    }
  }
  return state
}

export default configureStore({
  reducer: {
    ethData : ethReducer
  }
})