import React from "react";
import "./Cards.css";
import { cardsData } from "../../../Data/Data";

import Card from "../Card/Card";

export function Cards() {
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
           
          <div className="parentContainer" key={id} style={{margin:"5px"}}>

            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
              style={{padding:"25px"}}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;