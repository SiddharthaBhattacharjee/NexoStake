import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { getAddress } from 'ethers';
import metamaskimg from './images/metamask.png'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import HowPage from './components/How';
import PortfolioPage from './components/Portfolio';
import { useContext } from 'react';
import { GlobalContext, GlobalProvider } from './GlobalContext';


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

function App() {
  const { currentAccount, setCurrentAccount, correctNetwork, setCorrectNetwork, connectWallet, placeBet, transferShares, redeemBet, isBetting } = useContext(GlobalContext);
  const Register = async () => {
    window.open('https://evm.ngd.network/', '_blank');
  }

  useEffect(() => {
    connectWallet();
  }, [connectWallet])
  return (
    <div>
      {currentAccount === '' ? (
        <div className="loading" style={{ width: "100%", height: "100vh", display: 'flex', alignItems: "center", justifyContent: "space-evenly", flexDirection: "column" }}>
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div className="Head">NexoStake</div>
            <div className="SubHead">A Decentralized Future of Analytical Betting </div>
          </div>
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
            <div className='connectWalletButton' onClick={connectWallet}>
              Login With <img src={metamaskimg} alt="metamask" /> MetaMask
            </div>
            <div className="SubConnectWallet" onClick={Register}>Register</div>
          </div>

        </div>
      ) : !correctNetwork ? (
        <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "26px",
            width: "100%",
            height: "100vh"
          }}>
          <div>-----------------------------------------</div>
          <div>Please connect to the Neo Testnet</div>
          <div>and reload the page</div>
          <div>-----------------------------------------</div>
        </div>
      ) : (
        <Router>
          <div className="App" style={{ overflowX: 'hidden' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/working" element={<HowPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
}
