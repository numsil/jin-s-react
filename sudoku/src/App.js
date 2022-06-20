import "./App.css";
import React, { useState } from "react";
// import { Fragment } from "react";

// const randomNum = (min, max) => {
//   return min + Math.round(Math.random() * (max - min));
// };

const cols = 3;

const shuffle = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1)); // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
    // console.log(index);
  }
  return array;
};
// console.log();

const sudokuBlocks = () => {
  // 가로세로 순차적인 값을 채워주고 row 와 row, col 과 col 셔플 해줌
  // 1 2 3
  // 2 3 1
  // 3 1 2

  const datas = [];
  const shuffleCol = [];

  for (let y = 0; y < cols; y++) {
    shuffleCol.push(y);
    const data = [];
    for (let x = 0; x < cols; x++) {
      data.push(((x + y) % cols) + 1);
    }
    datas.push(data);
  }

  // row로 섞어 준다
  shuffle(datas);

  // col를 섞기 위한 값을 섞어줌
  shuffle(shuffleCol);

  // col 끼리 섞어 준다.
  const newDatas = [];
  for (let y = 0; y < cols; y++) {
    const data = [];
    for (let x = 0; x < cols; x++) {
      data.push(datas[y][shuffleCol[x]]);
    }
    newDatas.push(data);
  }

  return newDatas;
};

const testData = sudokuBlocks();

console.log(testData);
console.log(testData[0][0]);

function clickNum(numberPad) {
  console.log("click", numberPad);
  // for (let i = 1; i <= cols; i++) {
  //   let number = document.createElement("div");
  //   number.id = i;
  //   number.innerText = i;
  //   number.addEventListner("click", selectNumber);
  //   number.classList.add("gameNum");
  //   document.getElementById("digits").appendChild(number);
}

function clickBlock(rIndex, cIndex) {
  console.log(rIndex, cIndex);
}
// function selectNumber() {
//   if (numSelected != null) {
//     numSelected.classList.remove("gameNumselect");
//   }

//   numSelected = this;
//   numSelected.calssList.add("gameNumselect");
// }

// }

// function clickBlock(x, y) {
//   console.log(x, y);
// }
// const quizDatas = (blocks, x, y) => {
//   let randNum = 0;
//   let i = 0;
//   while (true) {
//     if (i++ > 1000) {
//       console.log("exit", x, y);
//       break;
//     }
//     randNum = sudokuBlocks(0, 2);

//     // 좌측으로 있는가? 있다면 다시 숫자 선정
//     if (blocks[y]) if (blocks[y].includes(randNum)) continue;
//     // 세로로 있는가 체크
//     let hasNum = false;
//     blocks.forEach((row) => {
//       if (row[x] !== undefined && row[x] == randNum) hasNum = true;
//     });
//     if (hasNum) continue;
//     break;
//   }
//   return randNum;
// };

function App() {
  const [sudokuData, setSudokuData] = useState([]);
  React.useEffect(() => {
    if (sudokuData.length === 0) {
      setSudokuData(sudokuBlocks());
    }
  }, [sudokuData.length]);

  //const [selectX, setSelectX] = React.useState(null);
  // const [selectY, setSelectY] = React.useState(null);

  //
  // const btn = () => {
  //   const el = document.getElementById("box");

  //   el.addEventListener(
  //     "click",
  //     (event) => {
  //       event.currentTarget.style.backgroundColor = "red";
  //     },
  //     false
  //   );
  // };

  const str = "123";
  const arr = str.split(""); //split 배열 분리

  // function clickNum() {
  //   for(let i=1; i<=cols; i++){
  //     let number = document.createElement("td")
  //     number.id=i
  //     number.innerText = i;
  //     number.addEventListner("click", selectNumber);
  //     number.classList.add("gameNum");
  //     document.getElementById("digits").appendChild(number);

  //   }

  //    console.log("click", );
  //    };

  const [buttonPopup, setButtonPopup] = useState(false);
  function Popup(props) {
    return props.trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <div style={{ margin: "10px" }}>
            New Game
            <div>
              <button
                className="close-btn"
                onClick={() => props.setTrigger(false)}
              >
                돌아가기
              </button>
              <button
                className="close-btn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                다시하기
              </button>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    ) : (
      ""
    );
  }

  return (
    <div>
      <div className="App">
        <div className="App-Background">
          <h1 style={{ textAlign: "center", color: "white" }}>Sudoku</h1>
          <table>
            <tbody>
              {sudokuData.map((row, rIndex) => {
                return (
                  <tr key={rIndex}>
                    {row.map((col, cIndex) => {
                      return (
                        <td
                          // id="box"
                          key={cIndex}
                          // className="cell"
                          onClick={() => {
                            clickBlock(rIndex, cIndex);
                          }}
                        >
                          {col}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <button type="button" className="resetbutton">
              Delete
            </button>
            <button
              className="newGameButton"
              onClick={() => setButtonPopup(true)}
            >
              New Game
            </button>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}></Popup>
          </div>
          <div className="keypad">
            {arr.map((numberPad, setnumberPad) => (
              <button
                style={{ cursor: "pointer", backgroundColor: "none" }}
                className="gameNum"
                key={setnumberPad}
                onClick={() => {
                  clickNum(setnumberPad);
                }}
              >
                {numberPad}
              </button> // 문자열 및 배열 객체별 분리
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
