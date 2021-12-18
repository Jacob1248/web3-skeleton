export const UPDATE_ETH_BALANCE="UPDATE_ETH_BALANCE"
export const METAMASK_ERROR_POPUP="METAMASK_ERROR_POPUP"
export const WALLETCONNECT_ERROR_POPUP="WALLETCONNECT_ERROR_POPUP"

export const updateEthereumBalance = payload => {
    return {
      type: UPDATE_ETH_BALANCE,
      payload: payload
    }
}

export const MetamaskError = () =>{
  return {
    type: METAMASK_ERROR_POPUP
  }
}

export const WalletConnectError = (payload) =>{
  return {
    type: WALLETCONNECT_ERROR_POPUP,
    payload:payload
  }
}