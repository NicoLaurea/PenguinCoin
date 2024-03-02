"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>

  //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
  //<Import Token>
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0x1bB0E82A07A7187175A60c96749AB00f33c5856E"; //contract add
    const tokenSymbol = "PNG";
    const tokenDecimal = 18;

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };
  //</Import Token>

  //HTML/TAILWIND BASTA DESIGN  BAGUHIN NIYO TO PLS LANG
  return (
    
    <body style={{ backgroundColor: 'powderblue'}}>
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com"></link>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
    </head>
      <main>
        
        <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '30px', marginTop: '10px' }}>
        Welcome to Crypternity of Penguin Tokens
        </p> 
  
        <div style={{ minHeight: '25vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => { connectWallet(); }} className="p-3 bg-yellow-400 text-black rounded">
            {walletKey !== "" ? walletKey : " Connect wallet"}
          </button>
        <br></br>
          <button onClick={importToken} className="p-3 bg-yellow-400 text-black rounded" style={{ marginTop: '10px' }}>
            Import Token
          </button>
        </div>
  
        <div style={{marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          <form>
            <label> Minting Amount</label><br></br>
          </form>
          <input
            type="number"
            value={mintingAmount}
            onChange={(e) => mintAmountChange(e)}
            style={{ color: 'black' }}
          />
          <br></br>
          <button
            onClick={() => { mintCoin(); }}
            className="p-3 bg-yellow-400 text-black rounded">
            {"Mint Token"}
          </button>
        </div>
  
        <br></br>
  
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>
          <form>
            <label> Stake Amount</label><br></br>
          </form>
          <input
            type="number"
            value={stakingAmount}
            onChange={(e) => stakeAmountChange(e)}
            style={{ color: 'black' }}
          />
  <br></br>
          <button
            onClick={stakeCoin}
            className="p-3 bg-yellow-400 text-black rounded">
            {"SlapStake"}
          </button>
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh' }}>
          <br></br>
          <label>Ready to Withdraw your Stake? to buy a Steak? </label>
          <br></br>
          <button
            onClick={withdrawCoin}
            className="p-3 bg-yellow-400 text-black rounded">
            {"Withdraw :>"}
          </button>
        </div>
      </main>
    </body>
  );
}  