import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { getAddress } from 'ethers';
import AbiFile from './assets/BetContract.json';
import ERC20ABI from "./assets/ERC20.json";
import Bets from './assets/addresses.json';

// Create a context for the global data
export const GlobalContext = createContext();

// Create a provider component for the global data
export const GlobalProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const ABI = AbiFile.abi;

  const connectWallet = async () => {
    try {
        const { ethereum } = window;
        if (!ethereum) {
          alert('Metamask Not Found ! Get MetaMask and Try Again.');
          return;
        }
  
        let chainId = await ethereum.request({ method: 'eth_chainId' });
  
        const NeoChainId = '0x2d5311';
        if (chainId !== NeoChainId) {
          alert('Please Connect to Neo Testnet');
          return;
        }
        else {
          setCorrectNetwork(true);
        }
  
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        console.log(currentAccount);
      } catch (error) {
        console.log(error);
      }
  }

  const getBetContract = async(id,signer) => {
    const contract = new ethers.Contract(Bets[id], ABI, signer);
    console.log(await contract.getAddress());
    return contract;
  }

  const getTokenContract = async(signer) => {
    const contract = new ethers.Contract('0xa3930611B6DA53969748B0359DE449f9dc8fF3E6', ERC20ABI.abi, signer);
    console.log("token : ",await contract.getAddress());
    return contract;
  }

  const placeBet = async (id,option,share) => {
    try {
      const { ethereum } = window;
      console.log(id, option, share);
      if (ethereum) {
        //setting up provider
        const provider = new Web3Provider(ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const BetContract = await getBetContract(id,signer);
        console.log(BetContract);
        const TokenContract  =await getTokenContract(signer);
        console.log(TokenContract);

        try {
            const call = await TokenContract.approve(Bets[id], "100000000000000");
            // await call.wait();
        } catch (error) {
            console.log(error);
            return;
        }

        //calling the smart contract
        try{
            let response = await BetContract.placeBet(option,share, {gasLimit:'168000'});
            // await response.wait();
            console.log('placeBet : ', response);
            alert("Transaction Successful!");
        }
        catch(err){
            console.log(err);
            alert("Transaction Failed!");
            return;
        }
      }
      else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const transferShares = async (id,to) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //setting up provider
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const BetContract = getBetContract(id,signer);
        //calling the smart contract
        BetContract._transferShares(to).then(
          response => {
            console.log('transferShares : ', response);
            alert("Transaction Successful!");
          }
        ).catch(err => {
          console.log(err);
          alert("Transaction Failed!");
        });
      }
      else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const redeemBet = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //setting up provider
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const BetContract = getBetContract(id,signer);
        //calling the smart contract
        BetContract.redeemBet().then(
          response => {
            console.log('redeemBet : ', response);
            alert("Transaction Successful!");
          }
        ).catch(err => {
          console.log(err);
          alert("Transaction Failed!");
        });
      }
      else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const isBetting = async (id,user) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //setting up provider
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const BetContract = getBetContract(id,signer);
        //calling the smart contract
        let hasBetted = await BetContract._isBetting(user);
        return hasBetted;
      }
      else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Pass the global data and functions as values to the provider
  return (
    <GlobalContext.Provider value={{ currentAccount, setCurrentAccount, correctNetwork, setCorrectNetwork, connectWallet, placeBet, transferShares, redeemBet, isBetting}}>
      {children}
    </GlobalContext.Provider>
  );
}
