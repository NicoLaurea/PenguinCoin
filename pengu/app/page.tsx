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
  
  
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0x1bB0E82A07A7187175A60c96749AB00f33c5856E";
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

  return (
    
  <body style={{ backgroundColor: '#f0f0f0', fontFamily: 'Montserrat, sans-serif' }}>
  <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: '10px', background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>

    <h1 style={{ textAlign: 'center', fontSize: '30px', marginBottom: '20px', color: '#333' }}>
      Welcome to Crypternity in PenguinCoin
    </h1>

    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <button onClick={() => { connectWallet(); }} className="p-3 bg-blue-500 text-white rounded">
        {walletKey !== "" ? walletKey : "Connect Wallet"}
      </button>
      <br />
      <button onClick={importToken} className="p-3 bg-green-500 text-white rounded" style={{ marginTop: '10px' }}>
        Import Token
      </button>
    </div>

    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <form>
        <label style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>Minting Amount</label><br />
        <input
          type="number"
          value={mintingAmount}
          onChange={(e) => mintAmountChange(e)}
          style={{ padding: '8px', width: '100%', boxSizing: 'border-box', color: '#333', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </form>
      <button
        onClick={() => { mintCoin(); }}
        className="p-3 bg-orange-500 text-white rounded"
        style={{ width: '100%' }}>
        Mint Token
      </button>
    </div>

    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <form>
        <label style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>Stake Amount</label><br />
        <input
          type="number"
          value={stakingAmount}
          onChange={(e) => stakeAmountChange(e)}
          style={{ padding: '8px', width: '100%', boxSizing: 'border-box', color: '#333', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </form>
      <button
        onClick={stakeCoin}
        className="p-3 bg-purple-500 text-white rounded"
        style={{ width: '100%' }}>
        SlapStake
      </button>
    </div>

    <div style={{ textAlign: 'center' }}>
      <label style={{ fontSize: '16px', color: '#333' }}>Ready to Withdraw your Stake? to buy a Steak?</label>
      <br />
      <button
        onClick={withdrawCoin}
        className="p-3 bg-red-500 text-white rounded"
        style={{ width: '100%' }}>
        Withdraw :&gt;
      </button>
    </div>

  </main>
</body>

  );
}  