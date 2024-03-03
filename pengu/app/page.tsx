"use client";
import { BrowserProvider } from "ethers";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [userWalletKey, setUserWalletKey] = useState("");
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [hashTransac, setHashTransac] = useState("");
  const [stakingAmount, setStakingAmount] = useState<number>();

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setUserWalletKey(accounts[0]);
  };
  const importToken = async () => {
    const { ethereum } = window as any;
    const tokenAddress = "0x1bB0E82A07A7187175A60c96749AB00f33c5856E";
    const tokenSymbol = "PNG";
    const tokenDecimal = 18;
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setHashTransac(tx.hash);
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

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setHashTransac(tx.hash);
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
      setHashTransac(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  return (
      <div className="bg-repeat" 
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/023/006/504/original/pixel-art-illustration-penguin-pixelated-penguin-penguin-bird-animal-pixelated-for-the-pixel-art-game-and-icon-for-website-and-video-game-old-school-retro-vector.jpg')`,
          backgroundSize: '50px',
          filter: 'brightness(0.8)',
        }}>
        <header>
          <p className="font-mono font-bold flex justify-center text-black text-7xl">Penguin the Coin</p>
          <p className="font-mono font-bold flex justify-center text-black text-2xl">A Coin for Eternity</p>
        </header>
        <div className="grid grid-cols-2 gap-4 py-0.5 relative">
          <div className="p-6">
            <h1 className="mt-10 text-3xl font-mono font-bold flex justify-center text-black">
            Link your Wallet to Crypternity
          </h1>
          <div className="mt-20 flex flex-col justify-center items-center">
            <button
              onClick={() => {
                connectWallet();
              }}
              className="p-3 bg-yellow-300 text-black font-mono font-bold border-double border-8 border-white-800"
            >
              {userWalletKey !== "" ? userWalletKey : "Connect your Wallet"}
            </button>
            <button
              onClick={importToken}
              className="mt-5 p-3 bg-yellow-300 text-black font-mono font-bold border-double border-8 border-white-800"
            >
              <p>Import Penguin</p>
            </button>
          </div>
        </div>
  
        <div className="p-6">
          <h1 className="mt-10 text-3xl font-bold font-mono flex justify-center text-black pixel">
            Mint your Coin here
          </h1>
          <div className="mt-16 flex flex-col justify-center text-black items-center gap-3">
            <form>
              <p className="font-bold font-mono text-xl">Grow your Penguin</p>
            </form>
            <h1><input
              className="font-mono font-bold text-black text-xl bg-transparent-700 border border-black-500 p-2 rounded-md"
              type="number"
              value={mintingAmount}
              onChange={(e) => mintAmountChange(e)}
            /><button
            onClick={() => {
              mintCoin();
            }}
            className="p-2 bg-yellow-300 text-black font-mono font-bold mt-3 border-double border-4 border-white-800 rounded-md">
            Buy Penguin
          </button></h1>
          </div>
        </div>
  
        <div className="p-6 relative z-10">
          <h1 className="mt-10 text-3xl font-bold font-mono flex justify-center text-black pixel">
            Buy your Coin here
          </h1>
          <div className="mt-16 flex flex-col justify-center items-center gap-1 text-black">
            <form>
              <p className="font-bold font-mono text-xl">Stake your Penguin</p>
            </form>
            <h1><input
              className="font-mono font-bold text-black text-xl bg-transparent-700 border border-black-500 p-2 rounded-md"
              type="number"
              value={stakingAmount}
              onChange={(e) => stakeAmountChange(e)}/> 
              <button
              onClick={stakeCoin}
              className="p-2 bg-yellow-300 text-black font-mono font-bold mt-3 border-double border-4 border-white-800 rounded-md">
              Stake it Salt Papi
            </button></h1>
          </div>
        </div>
  
        <div className="p-6 relative z-10">
          <h1 className="mt-10 text-3xl font-bold font-mono flex justify-center text-black">
            Ready to Withdraw your Stake? to buy a Steak?
          </h1>
          <div className="mt-14 flex flex-col justify-center items-center gap-5 border-double">
            <button
              onClick={withdrawCoin}
              className="p-3 bg-yellow-300 text-black font-mono font-bold mt-3 border-double border-8 border-white-800">
              Withdraw Penguin
            </button>
          </div>
        </div>
      </div>
      <footer className="font-mono font-bold text-black justify-center">
          <p className="font-mono font-bold flex justify-center text-black text-2xl leading-10"><a href="#">To the top</a></p>
          <div className="font-mono font-bold text-black justify-center">
          <p className="font-mono font-bold flex justify-center text-black text-xl leading-10"><a href="https://www.instagram.com/nicolaurea/">Instagram </a><a href="https://web.facebook.com/laurea.nico/"> FaceBook</a></p>
          </div>
        </footer>
    </div>
  );
}  