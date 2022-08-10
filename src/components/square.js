import React, { useState } from 'react'


export const Square = () => {
    /* 
    0: empty
    1: part of ship
    2: shot ship
    3: missed
    */
    const estado = useState(0)
    
    
    return (
        <div style={{height: "10%", width: "10%", border: "solid black 1px"}}></div>
    )
}

