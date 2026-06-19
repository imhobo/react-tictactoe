import React, { useState, useEffect, useRef } from 'react';
import { checkWinner, getComputerMove } from './Logic';
import Layout from './Layout';

const styles = {
    width: '200px',
    margin: '20px auto',
};
const pStyle = {
    color: 'green'
}

const confettiColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff'];

function Game() {

    const [layout, setLayout] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const [mode, setMode] = useState('2player');
    const [turns, setTurns] = useState(0);
    const [computerThinking, setComputerThinking] = useState(false);
    const [confetti, setConfetti] = useState([]);
    const winner = checkWinner(layout);
    const gameRef = useRef(null);

    const getWinningLine = (boxes) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let line of lines) {
            const [x, y, z] = line;
            if (boxes[x] && boxes[x] === boxes[y] && boxes[x] === boxes[z]) {
                return line;
            }
        }
        return [];
    };

    const winningLine = winner ? getWinningLine(layout) : [];

    useEffect(() => {
        if (winner || turns === 9) {
            const particles = [];
            for (let i = 0; i < 30; i++) {
                particles.push({
                    id: i,
                    left: Math.random() * 100,
                    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                    size: Math.random() * 10 + 5,
                    delay: Math.random() * 2,
                    duration: Math.random() * 2 + 2,
                    round: Math.random() > 0.5,
                });
            }
            setConfetti(particles);
        } else {
            setConfetti([]);
        }
    }, [winner, turns]);

    const resetGame = () => {
        setLayout(Array(9).fill(null));
        setXisNext(true);
        setTurns(0);
        setComputerThinking(false);
        setConfetti([]);
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

    const gameOver = winner || turns === 9;

    return (
        <div ref={gameRef}>
            {confetti.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'fixed',
                        left: p.left + '%',
                        top: '-10px',
                        width: p.size + 'px',
                        height: p.size + 'px',
                        backgroundColor: p.color,
                        borderRadius: p.round ? '50%' : '0',
                        animation: `confetti-fall ${p.duration}s ease-out ${p.delay}s infinite`,
                        zIndex: 1000,
                        pointerEvents: 'none',
                    }}
                />
            ))}
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
            <Layout boxes={layout} onClick={handleClick} winning={winningLine} />
            <div style={styles}>
                <p style={gameOver ? { ...pStyle, animation: 'pulse-glow 1.5s ease-in-out infinite' } : pStyle}>
                    {winner ? 'Winner: ' + winner : (turns === 9 ? 'Phew! The Draw logic works' : 'Next Player '
                        + (xIsNext ? 'X' : 'O'))}
                </p>
                {gameOver && (
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            border: '2px solid #4CAF50',
                            borderRadius: '4px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            animation: 'fade-in 0.5s ease-out',
                            display: 'block',
                            margin: '10px auto',
                        }}
                        onClick={resetGame}
                    >
                        Play Again
                    </button>
                )}
            </div>
        </div>
    )
}

export default Game;