import { configureStore } from '@reduxjs/toolkit'
import { UPDATE_ETH_BALANCE } from './actions'

const initialState = { ethBalance: 0 }

function ethReducer(state = initialState, action) {
  if (action.type === UPDATE_ETH_BALANCE) {
    return {
      ...state,
      ethBalance: action.payload
    }
  }
  return state
}

export default configureStore({
  reducer: {
    ethData : ethReducer
  }
})