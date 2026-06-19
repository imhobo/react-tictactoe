import React from 'react';
function Box({ value, onClick, isWinning }) {
    return (
        <button
            style={isWinning ? { ...winningStyle } : style}
            onClick={onClick}>
            {value}
        </button>
    );
}
export default Box;

const style = {
    background: '#fff',
    border: '2px solid lightblue',
    fontSize: '30px',
    fontWeight: '800',
    cursor: 'pointer',
    outline: 'none'
}

const winningStyle = {
    background: '#fff',
    border: '3px solid gold',
    fontSize: '30px',
    fontWeight: '800',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 0 10px gold'
}