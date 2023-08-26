import { useState } from "react";
import news from './News';

let arr = [
    {
        id:1,
        count:10,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:4,
        count:9,
        price:1
    },
    {
        id:6,
        count:11,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
    {
        id:3,
        count:8,
        price:1
    },
];

function PortfolioPage(){
    return(
        <div style={{width:"100%",display:'flex',alignItems:'center',justifyContent:'space-evenly',flexDirection:'column',marginTop:"10em"}}>
            {arr.map((item) => (
                <div style={{width:"90%",height:"3em",display:'flex',alignItems:'center',justifyContent:'space-evenly',backgroundColor:"#1b1a2ea9",marginBottom:"0.5em"}}>
                  <div style={{color:'white',width:"80%", textAlign:"left", paddingLeft:"2em"}}>{"Desc: "+news[item.id]}</div>
                  <div style={{color:'white',width:"10%"}}>{"Count: "+item.count}</div>
                  <div style={{color:'white',width:"10%"}}>{"Price: "+item.count*item.price}</div>
                </div>
              ))}
    </div>
    );
    
}

export default PortfolioPage;