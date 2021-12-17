export const UPDATE_ETH_BALANCE="UPDATE_ETH_BALANCE"

export const updateEthereumBalance = payload => {
    return {
      type: UPDATE_ETH_BALANCE,
      payload: payload
    }
}