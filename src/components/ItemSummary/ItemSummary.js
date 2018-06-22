import React from 'react'
import Button from '../Button/Button'
import './ItemSummary.css'

const ItemSummary= (props) => {
    const {
      name,
      title,
      affilliation,
      home_planet,
      description,
      image,
      quantity,
      price,
      is_on_sale,
      is_new,
      editItem,
      removeItem,
    } = props;
    
    return (
      <li className="item-summary">
        <div>
          <img src={image} alt={name} />
        </div>
        
        <h3>{ name }</h3> 
        <div className="subtext title-subtext">
          { title }
        </div>
        <div className="subtext">
          <b>Affilliation:</b> { affilliation }<br />
          <b>Home Planet:</b> { home_planet }
        </div>
        
        <div className="item-description">
          <h4>Description:</h4>
          
          <p>{ description }</p>
        </div>
        
        <div>
          <h4>${ price }</h4>
        </div>
        
        <div className="quantity">
          { (quantity && quantity < 15)  && <p>Hurry!  Only { quantity } item{ quantity !== 1 && 's'} left!</p> }
        </div>
        
        <div className="tags">
          { is_new && <b>New!</b> }
          { is_on_sale && <b>Sale!</b> }
        </div>
        <div className="item-controls">
          <Button className="raised" onClick={editItem}>Edit</Button>
          <Button className="warn raised" onClick={removeItem}>Remove</Button>
        </div>
      </li>
    );
};

export default ItemSummary