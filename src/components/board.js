import React from 'react'
import { Square } from './square'

// Componente que renderiza 100 cuadrados (uno por cada valor en userBoard/computerBoard)
export const Board = ({ board }) => {
    
    return (
        <div>
            <ul className='d-flex flex-wrap' style={{ height: "35em", width: "35em" }}>
                {board.map((x, i) => {
                    return (
                        <Square key={i} index={i} board={board} />
                    )
                })}
            </ul>
        </div>
    )
}

