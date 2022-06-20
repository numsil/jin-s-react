import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("보자기");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setResult("딩동댕");
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("틀림");
      setValue("");
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput} />
        <button>버튼</button>
      </form>
      <div>{result}</div>
    </>
  );
}

export default App;
