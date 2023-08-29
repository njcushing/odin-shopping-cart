import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

import ShopItemCard from '../ShopItemCard/ShopItemCard';

const mockItems = [
    {
        id: uuidv4(),
        name: "Navy Backpack",
        imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        originalPrice: 1299,
        currentPrice: 849,
        quantityMin: 0,
        quantityMax: 100,
    },
];

function App() {
    return (
        <>
            {mockItems.map((item) => 
                <ShopItemCard itemInformation={item} key={item.id} />
            )}
        </>
    )
}

export default App;
