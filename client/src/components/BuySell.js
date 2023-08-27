import { useState } from "react";
import { useContext } from 'react';
import { GlobalContext, GlobalProvider } from '../GlobalContext';

function BuySellCard({buyPrice,sellPrice,desc,id}){
    const { currentAccount, setCurrentAccount, correctNetwork, setCorrectNetwork, connectWallet, placeBet, transferShares, redeemBet, isBetting } = useContext(GlobalContext);
    let [option,setOption] = useState(0);
    let [outcome, setOutcome] = useState('yes');
    let [amount, setAmount] = useState(0);
    let [toAddr,setToAddr] = useState(" ");
    let setBuy = () => {
        setOption(0);
    }
    let setSell = () => {
        setOption(1);
    }
    const handleOutcomeChangeYes = (event) => {
        setOutcome('yes');
    }
    const handleOutcomeChangeNo = (event) => {
        setOutcome('no');
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }
    const handleToAddrChange = (event) => {
        setToAddr(event.target.value);
    }

    const handleIncrement = () => {
        setAmount(amount + (outcome === 'yes' ? buyPrice : sellPrice));
    }

    const handleDecrement = () => {
        setAmount(amount - (outcome === 'yes' ? buyPrice : sellPrice));
    }

    const handleBuy = () => {
        let u_id = id;
        let outcome = 1;
        if(outcome==='yes'){
            outcome = 0;
        }
        let share = amount;
        console.log(u_id,outcome,share);
        placeBet(u_id,outcome,share);
    }
    const handleSell = () => {
        let u_id = id;
        let u_to = toAddr;
        transferShares(u_id,u_to);
    }
    return(
        <div style={{width:'30em', height:'25em',backgroundColor:'white'}}>
            <div style={{height:'15%',width:'100%',display:'flex',alignItems:'center',justifyContent:'space-evenly',textAlign:'center',borderBottom: '1px solid gray'}}>
                <p onClick={setBuy} style={{color: option === 0 ? 'blue' : 'black', textDecoration: option === 0 ? 'underline' : 'none', cursor:'pointer', fontFamily:'brighton std', fontWeight:'bold', fontSize:'20px'}}>Buy</p>
                <p onClick={setSell} style={{color: option === 1 ? 'blue' : 'black', textDecoration: option === 1 ? 'underline' : 'none', cursor: 'pointer', fontFamily:'brighton std', fontWeight:'bold', fontSize:'20px'}}>Sell</p>
            </div>
            {option === 0 && (
                <div style={{height:'85%',width:'100%',display:'flex',alignItems:'center',justifyContent:'space-evenly',flexDirection:'column'}}>
                    <div style={{display:'flex',alignItems:'start',justifyContent:'start',flexDirection:'column', width:'45%'}}>
                        <label style={{fontFamily:'brighton std', fontWeight:'bold'}}>Description:</label>
                        <div style={{width:"100%",display:'flex',alignItems:'center',justifyContent:'center', textAlign:'left'}}>
                            {desc}
                        </div>
                    </div>
                    <div style={{display:'flex',alignItems:'start',justifyContent:'start',flexDirection:'column', width:'45%'}}>
                        <label style={{fontFamily:'brighton std', fontWeight:'bold'}}>Outcome:</label>
                        <div style={{width:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <button value={`Yes: $ ${buyPrice}`} onClick={handleOutcomeChangeYes} style={{backgroundColor: outcome === 'yes' ? 'green' : 'lightGray',width:"40%",marginRight:"10%", border:'0px', height:'2.5em', borderRadius:'1em'}}>{`Yes: $ ${buyPrice}`}</button>
                            <button value={`No: $ ${sellPrice}`} onClick={handleOutcomeChangeNo} style={{backgroundColor: outcome === 'no' ? 'red' : 'lightGray',width:"40%", border:'0px', height:'2.5em', borderRadius:'1em'}}>{`No: $ ${sellPrice}`}</button>
                        </div>
                    </div>
                    <div style={{display:'flex',alignItems:'start',justifyContent:'start',flexDirection:'column'}}>
                        <label style={{fontFamily:'brighton std', fontWeight:'bold'}}>Amount:</label>
                        <div style={{border:"1px solid grey"}}>
                            <button onClick={handleDecrement} style={{border:'0px'}}>-</button>
                            <input type="number" value={amount} onChange={handleAmountChange} style={{border:'0px'}} />
                            <button onClick={handleIncrement} style={{border:'0px'}}>+</button>
                        </div>                 
                    </div>
                    <div style={{width:'100%'}}>
                        <button onClick={handleBuy} style={{backgroundColor: '#2196F3', border:'0px', color: 'white', width:'50%', height:'2.5em',borderRadius:'1em'}}>Buy</button>
                    </div>
                </div>
            )}
            {option === 1 && (
                <div style={{height:'85%',width:'100%',display:'flex',alignItems:'center',justifyContent:'space-evenly',flexDirection:'column'}}>
                    <div style={{display:'flex',alignItems:'start',justifyContent:'start',flexDirection:'column', width:'45%'}}>
                        <label style={{fontFamily:'brighton std', fontWeight:'bold'}}>Description:</label>
                        <div style={{width:"100%",display:'flex',alignItems:'center',justifyContent:'center', textAlign:'left'}}>
                            {desc}
                        </div>
                    </div>
                    <div style={{display:'flex',alignItems:'start',justifyContent:'start',flexDirection:'column', width:'45%'}}>
                        <label style={{fontFamily:'brighton std', fontWeight:'bold'}}>Outcome:</label>
                        <div style={{width:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <button value={`Yes: $ ${buyPrice}`} onClick={handleOutcomeChangeYes} style={{backgroundColor: outcome === 'yes' ? 'green' : 'lightGray',width:"40%",marginRight:"10%", border:'0px', height:'2.5em', borderRadius:'1em'}}>{`Yes: $ ${buyPrice}`}</button>
                            <button value={`No: $ ${sellPrice}`} onClick={handleOutcomeChangeNo} style={{backgroundColor: outcome === 'no' ? 'red' : 'lightGray',width:"40%", border:'0px', height:'2.5em', borderRadius:'1em'}}>{`No: $ ${sellPrice}`}</button>
                        </div>
                    </div>
                    <div style={{display:'flex',alignItems:'start',justifyContent:'start',flexDirection:'column'}}>
                        <label style={{fontFamily:'brighton std', fontWeight:'bold'}}>Amount:</label>
                        <div style={{border:"1px solid gray"}}>
                            <button onClick={handleDecrement} style={{border:'0px'}}>-</button>
                            <input type="number" value={amount} onChange={handleAmountChange} style={{border:'0px'}} />
                            <button onClick={handleIncrement} style={{border:'0px'}}>+</button>
                        </div>                 
                    </div>
                    <div style={{display:'flex',alignItems:'start',justifyContent:'start',flexDirection:'column', width:'47%'}}>
                        <label style={{fontFamily:'brighton std', fontWeight:'bold'}}>Wallet Address:</label>
                        <div style={{width:'100%'}}>
                            <input value={toAddr} onChange={handleToAddrChange} style={{border:'1px solid grey', width:'100%'}} />
                        </div>                 
                    </div>
                    <div style={{width:'100%'}}>
                        <button onClick={handleSell} style={{backgroundColor: '#2196F3', border:'0px', color: 'white', width:'50%', height:'2.5em',borderRadius:'1em'}}>Sell</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuySellCard;
