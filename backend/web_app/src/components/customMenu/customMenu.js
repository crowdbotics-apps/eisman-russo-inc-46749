import React from 'react';
import './customMenu.css'; 

export default function CustomMenu({items}) {
  return (
    <div className="custom-menu">
        <ul>
        {items.map((item, index) => (
            <li key={index}>
            <a href={item.link}>{item.label}</a>
            </li>
        ))}
        </ul>
    </div>
  )
}
