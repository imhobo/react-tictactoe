import React, { useState, useEffect } from 'react';
import { checkWinner, getComputerMove } from './Logic';
import Layout from './Layout';

const styles = {
    width: '200px',
    margin: '20px auto',
};
const pStyle = {
    color: 'green'
}

function Game() {

    const [layout, setLayout] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const [mode, setMode] = useState('2player');
    const [turns, setTurns] = useState(0);
    const [computerThinking, setComputerThinking] = useState(false);
    const winner = checkWinner(layout)

    const resetGame = () => {
        setLayout(Array(9).fill(null));
        setXisNext(true);
        setTurns(0);
        setComputerThinking(false);
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        resetGame();
    };

    const handleClick = (i) => {
        if (winner || layout[i] || computerThinking) return;
        const layoutState = [...layout];
        layoutState[i] = xIsNext ? 'X' : 'O';
        setLayout(layoutState);
        setXisNext(!xIsNext);
        setTurns(t => t + 1);
    };

    useEffect(() => {
        if (mode === '1player' && !xIsNext && !winner && turns < 9) {
            setComputerThinking(true);
            const timer = setTimeout(() => {
                const computerMove = getComputerMove(layout);
                if (computerMove !== null) {
                    const newLayout = [...layout];
                    newLayout[computerMove] = 'O';
                    setLayout(newLayout);
                    setXisNext(true);
                    setTurns(t => t + 1);
                }
                setComputerThinking(false);
            }, 500);
            return () => {
                clearTimeout(timer);
                setComputerThinking(false);
            };
        }
    }, [mode, xIsNext, winner, layout, turns]);

    const btnStyle = {
        padding: '8px 16px',
        margin: '0 5px',
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
    };

    const activeBtnStyle = {
        ...btnStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    return (
        <React.Fragment>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <button
                    style={mode === '2player' ? activeBtnStyle : btnStyle}
                    onClick={() => handleModeChange('2player')}
                >
                    2 Player
                </button>
                <button
                    style={mode === '1player' ? activeBtnStyle : btnStyle}
                    onClick={() => handleModeChange('1player')}
                >
                    1 Player (vs Computer)
                </button>
            </div>
            <Layout boxes={layout} onClick={handleClick} />
            <div style={styles}>
                <p style={pStyle}>{winner ? 'Winner: ' + winner : (turns === 9 ? 'Phew! The Draw logic works' : 'Next Player '
                    + (xIsNext ? 'X' : 'O'))}
                </p>
            </div>
        </React.Fragment>
    )
}

export default Game;