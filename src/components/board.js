import React from 'react'
import { Square } from './square'
import { useBattleShipContext } from '../context/battleshipContext'

export const Board = ({ board, player }) => {
    const { variables, actions } = useBattleShipContext();


    return (
        <div>
            <ul className='d-flex flex-wrap' style={{ height: "35em", width: "35em" }}>
                {board.map((x, i) => {
                    return (
                        <Square key={i} value={board[i]} player={player}/>
                    )
                })}
            </ul>
        </div>
    )
}

