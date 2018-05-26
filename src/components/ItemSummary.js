import React from 'react'
import Button from './Button'
import './ItemSummary.css'

const ItemSummary= (props)=> {
    const {name, title, affilliation, homePlanet, removeItem, clickItem} = props;
    return (
      <li onClick= {clickItem} className="item-summary">
        <h3>{ name }</h3> 
        { title } | { affilliation } | { homePlanet }
        <br />
        <Button className="warn raised" onClick={removeItem}>Remove</Button>
      </li>
    );
};

export default ItemSummary