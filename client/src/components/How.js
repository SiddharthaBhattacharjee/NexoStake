import React from "react";

function HowPage(){
    return(
        <div style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center', textAlign:'left'}}>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly',width:'100%',marginTop:'5em'}}>

            <div style={{width:"40em" ,paddingLeft:'5em',paddingRight:'5em',paddingTop:'1em',paddingBottom:'1em'}}>
                <img src="/howimg/How1.jpeg" alt = "How1"/>
                <h4 style={{color:'white'}}>Choose a Market</h4>
                <p style={{color:"white"}}>
                Gamble on contemporary happenings, politics, sports, and a plethora of other domains as events transpire. Market values mirror the dynamic probabilities of events occurring. As demonstrated here, there exists a 69% probability that Elon will share a tweet today.
                </p>
            </div>
            <div style={{width:"40em" ,paddingLeft:'5em',paddingRight:'5em',paddingTop:'1em',paddingBottom:'1em'}}>
                <img src="/howimg/How2.jpeg" alt = "How1"/>
                <h4 style={{color:'white'}}>Add Funds</h4>
                <p style={{color:"white"}}>
                In order to engage in trading, it's necessary to finance your account. If you presently possess cryptocurrency, you have the option to transfer funds directly from a wallet or exchange. Alternatively, if you lack cryptocurrency, you can acquire USDC—a supervised currency upheld at a 1:1 ratio with the US Dollar—using your credit card.
                </p>
            </div>
            <div style={{width:"40em" ,paddingLeft:'5em',paddingRight:'5em',paddingTop:'1em',paddingBottom:'1em'}}>
                <img src="/howimg/How3.jpeg" alt = "How1"/>
                <h4 style={{color:'white'}}>Place a Bet</h4>
                <p style={{color:"white"}}>
                When you're prepared to engage in trading, just select a potential outcome and indicate the sum you wish to wager. Immediate execution occurs for market orders at the prevailing odds, whereas limit orders empower you to establish your preferred odds, inviting others to trade accordingly.
                </p>
            </div>
            <div style={{width:"40em" ,paddingLeft:'5em',paddingRight:'5em',paddingTop:'1em',paddingBottom:'1em'}}>
                <img src="/howimg/How4.jpeg" alt = "How1"/>
                <h4 style={{color:'white'}}>Earn if you are Right</h4>
                <p style={{color:"white"}}>
                Once you're set to enter the trading arena, as the market concludes, each share will hold a value of either $1, if your prediction proves correct, or $0, if your prediction falters. If you're not inclined to await the market's closure, the option to sell your shares remains available at any juncture, leveraging the prevailing odds.
                </p>
            </div>


          </div>
        </div>
    );
}

export default HowPage;