import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  const handleCountUpdate = () =>{
    setCount(count + 1);
  }

  const handleInputChange = (e) => {
  setName(e.target.value);
  }

  useEffect(() => {
    console.log("렌더링");
  },[count]);
 
  return (
    <div>
      <button onClick={handleCountUpdate}>Update</button>
      <span>count : {count}</span>
      <input type="text" value={name} onChange={handleInputChange} />
      <span>name: {name} </span>
    </div> 
  );
}

export default App;