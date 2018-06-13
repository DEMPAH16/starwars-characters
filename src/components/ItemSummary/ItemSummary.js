import React from 'react'
import Button from '../Button/Button'
import './ItemSummary.css'

const ItemSummary= (props)=> {
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
        <h3>{ name }</h3> 
        <b>Title:</b> { title }<br />
        <b>Affilliation:</b> { affilliation }<br />
        <b>Home Planet:</b> { home_planet }
        
        <div>
          <h4>Description:</h4>
          
          <p>{ description }</p>
        </div>
        
        <div>
          <img src={image} alt={name} />
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
        <br />
        <Button className="raised" onClick={editItem}>Edit</Button>
        <Button className="warn raised" onClick={removeItem}>Remove</Button>
      </li>
    );
};

export default ItemSummary