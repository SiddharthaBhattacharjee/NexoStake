import React, { useState } from "react";
import CustomCard from "./BetCard";
import BuySellCard from './BuySell';
import news from './News';

const length = Object.keys(news).length
let arr = []
for(let i=1;i<=length;i++){
    arr.push(
        {
            image:"/cards/"+i+".jpeg",
            description: news[i],
            yesPrice:1,
            noPrice:1,
            id:i
        }
    )
}

function Home() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (item) => {
      setSelectedCard(item);
  }

  const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
          setSelectedCard(null);
      }
  }

  return(
      <div style={{width:'100%',minHeight:'100vh', display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly',width:'100%',marginTop:'6em'}}>
              {arr.map((item) => (
                  <CustomCard
                      image={item.image}
                      description={item.description}
                      yesPrice={`Yes: $ ${item.yesPrice}`}
                      noPrice={`No: $ ${item.noPrice}`}
                      onClick={() => handleCardClick(item)}
                      id = {item.id}
                  />
              ))}
          </div>
          {selectedCard && (
              <div
                  style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  onClick={handleOverlayClick}
              >
                  <BuySellCard buyPrice={selectedCard.yesPrice} sellPrice={selectedCard.noPrice} desc={selectedCard.description} id={selectedCard.id} />
              </div>
          )}
      </div>
  );
}

export default Home;
