import styled from 'styled-components';
import socket from '../socket';

const CommandGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  border: 1px solid black;
  button {
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05);
    border: 0;
    background: #2f2825;
    border: 4px solid black;
    color: white;
    font-size: 1rem;
    position: relative;
    &:active {
      top: 2px;
    }
    &:focus {
      outline: 0;
      border-color: #ffc600;
    }
    &.takeoff {
      background: #5664aa;
    }
    &.land {
      background: #047304;
    }
    &.emergency {
      background: red;
      text-transform: uppercase;
      color: black;
    }
    &.rotate {
      background: #ff9100;
      color: black;
    }
    &.height {
      background: #fff;
      color: black;
    }
    span.symbol {
      display: block;
      font-size: 2rem;
      font-weight: 400;
    }
  }
  .center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    button:last-child {
      grid-column: span 2;
    }
  }
`;

function sendCommand(command) {
  return function() {
    console.log(`Sending the command ${command}`);
    socket.emit('command', command);
  };
}

const amount = 100;
const Commands = () => (
  <CommandGrid>
    <button className="rotate" onClick={sendCommand('ccw 90')}>
      <span className="symbol">⟲</span> 90°
    </button>
    <button onClick={sendCommand(`forward ${amount}`)}>
      <span className="symbol">↑</span> forward {amount}cm
    </button>
    <button className="rotate" onClick={sendCommand('cw 15')}>
      <span className="symbol">⟳</span> 15°
    </button>
    <button onClick={sendCommand(`left ${amount}`)}>
      <span className="symbol">←</span> left {amount}cm
    </button>
    <div className="center">
      <button className="takeoff" onClick={sendCommand('takeoff')}>
        Take Off
      </button>
      <button className="land" onClick={sendCommand('land')}>
        Land
      </button>
      <button className="emergency" onClick={sendCommand('emergency')}>
        !! EMERGENCY !!
      </button>
    </div>
    <button onClick={sendCommand(`right ${amount}`)}>
      <span className="symbol">→</span>
      right {amount}cm
    </button>
    <button className="height" onClick={sendCommand(`up ${amount}`)}>
      <span className="symbol">⤒</span> {amount}cm
    </button>
    <button onClick={sendCommand(`back ${amount}`)}>
      <span className="symbol">↓</span> back {amount}cm
    </button>
    <button className="height" onClick={sendCommand(`down ${amount}`)}>
      <span className="symbol">⤓</span> {amount}cm
    </button>
  </CommandGrid>
);

export default Commands;
