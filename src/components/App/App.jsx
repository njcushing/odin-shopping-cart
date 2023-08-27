import { useState } from 'react'
import './App.css'

import ShopItemCard from '../ShopItemCard/ShopItemCard';

function App() {
    return (
        <>
            <ShopItemCard
                itemInformation={{
                    quantityMin: 0,
                    quantityMax: 100,
                }}
            />
        </>
    )
}

export default App;
