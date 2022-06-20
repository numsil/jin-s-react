// import { useState, useCallback } from "react";
// import "./App.css";

// const Cell = ({ handleClick, active }) => {
//   return <div onClick={handleClick}>Hello World</div>;
// };

// function App() {
//   const [active, setActive] = useState(false);
//   const [num, setNum] = useState([1, 2, 3]);
//   const [checkNum, setCheckNum] = useState(0);
//   const handleSelectBox = useCallback((idx) => {
//     console.log("=> idx", idx);
//     setCheckNum(idx);
//   }, []);
//   const handleCheck = useCallback(() => {
//     for (let i = 0; i < num.length; i++) {
//       if (checkNum === num[i]) {
//         console.log("true ============>", checkNum, num[i]);
//         setActive(true);
//       }
//       if (checkNum !== num[i]) {
//         console.log("false", checkNum, num[i]);
//         setActive(false);
//         setCheckNum(0);
//       }
//       console.log("check", active, checkNum, num[i]);
//     }
//   }, [num, checkNum, active]);
//   console.log("=>", active);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>
//           {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => (
//             <Cell key={idx} handleClick={() => handleSelectBox(item)}></Cell>
//           ))}
//           {num.map((item, idx) => (
//             <div key={idx} onClick={handleCheck}>
//               {item}
//             </div>
//           ))}
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;
