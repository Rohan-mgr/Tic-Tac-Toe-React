import React, { useState, useEffect } from "react";
import "./Square.css";

function Square() {
  const [turn, setTurn] = useState("X");
  const [entries, setEntries] = useState(Array(9).fill(" "));
  const [gameWinner, setGameWinner] = useState(" ");
  const [winnerIndex, setWinnerIndex] = useState([]);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    if (
      !entries
        .map((el) => {
          if (el === " ") {
            return false;
          }
          return true;
        })
        .includes(false)
    ) {
      setDraw(true);
    }
  }, [entries]);

  function decideWinner(squares) {
    const winner = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let key in winner) {
      winner[key].forEach((el) => {
        if (
          squares[el[0]] === " " ||
          squares[el[1]] === " " ||
          squares[el[2]] === " "
        ) {
          return;
        } else if (
          squares[el[0]] === squares[el[1]] &&
          squares[el[1]] === squares[el[2]]
        ) {
          setGameWinner(squares[el[0]]);
          setWinnerIndex(el);
        }
      });
    }
  }

  const handleSquareClick = (num) => {
    if (entries[num] !== " " || gameWinner !== " ") {
      return;
    }
    let squares = [...entries];
    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }
    decideWinner(squares);
    setEntries(squares);
  };

  const Cell = ({ num }) => {
    return (
      <td
        onClick={() => handleSquareClick(num)}
        className={
          winnerIndex.length !== 0
            ? winnerIndex.includes(num)
              ? "wins"
              : "lose"
            : null
        }
      >
        <span>{entries[num]}</span>
      </td>
    );
  };

  function handleClick() {
    setEntries(Array(9).fill(" "));
    setWinnerIndex([]);
    setTurn("X");
    setGameWinner(" ");
    setDraw(false);
  }

  return (
    <div className="squares">
      <div className="header">
        <p>
          Turn: <span>{turn}</span>
        </p>
        {gameWinner !== " " && (
          <p>
            Winner: <span>{gameWinner}</span>
          </p>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {(gameWinner !== " " || draw) && (
        <button onClick={handleClick}>Play Again</button>
      )}
    </div>
  );
}

export default Square;
