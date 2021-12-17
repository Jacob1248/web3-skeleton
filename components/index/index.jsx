import { useWeb3React } from "@web3-react/core";
import Web3 from 'web3';
import { NFT_MINTER_ADDRESS, NFT_MINT_ABI } from '../../utils/config';
import React,{ useEffect } from 'react'
import { ALL_SUPPORTED_CHAIN_IDS } from "../../utils/constants";

function IndexPage(props) {

  const { account,library } = useWeb3React()

  async function mint() {
    try {
        let web3js = new Web3(library.currentProvider);
        let nftMinter = new web3js.eth.Contract(NFT_MINT_ABI, NFT_MINTER_ADDRESS);
        console.log(nftMinter)
        nftMinter.methods.createToken()
        .send({ from: account ,value: Web3.utils.toWei("0.35", "ether") })
        .then(
            onFulfilled=>{
              alert("Transaction success!Check your wallet ;)")
            },
            onRejected=>{
              alert("Transaction failed!")
            }
        )
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
      <div className='relative h-full border-2 p-2'>
        <button  className="font-bold py-1 px-4 border-2 border-black  rounded-xl relative mr-4 max-w-xs overflow-hidden truncate" onClick={mint}>Mint</button>
      </div>
  );
}

export default IndexPage;
