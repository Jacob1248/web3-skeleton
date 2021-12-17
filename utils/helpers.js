import Web3 from "web3";

export const convertToEther = async (library,account) =>{
    return Math.round(Web3.utils.fromWei(await library.eth.getBalance(account))*100)/100;
}