import React from 'react'
import { Square } from './square'
import { useBattleShipContext } from '../context/battleshipContext'

export const Board = () => {
    const { variables, actions } = useBattleShipContext();

    return (
        <div>
            <ul className='d-flex flex-wrap' style={{height:"35em", width: "35em"}}>
                {variables.boardUser.map((x, i) => {
                    return (
                        <Square key={i} />
                    )
                })}
            </ul>
        </div>
    )
}

