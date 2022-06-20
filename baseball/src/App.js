import { useState } from 'react';
import './App.css';


function getNumbers(){
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i +=1 ){
    const chosen = candidate.splice(Math.floor(Math.random()*(9 -i)), 1)[0];
    array.push(chosen);
  }
  return array;
}


function App() {

  const [result, setResult] = useState();
  const [value, setValue] = useState();
  const [tries, setTries] = useState([]);
 
  const getNumbers = ()=>{

  };

  const onSubmitForm = (e)=>{
    e.preventDefault();
    if(value === answer.join('')){
      result = '홈런!'
      tries = [...tries, { try : value, result: '홈런!'}]
    } else {
      for(let i = 0; i < 4; i +=1 ){
        if(anserArray[i] === answer[i]) {
          strike += 1;
        } else if (answer.includes(answerArray[i])){
          ball += 1;
        }
      }
    }
  };

  const onChangeInput = ()=>{

  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit = {onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도 : {tries.lenght}</div>
      <ul>
        {tries.map((setTries, i)=>{
          
           <li key={i}></li> 
          
        })}
        
      </ul>
    </>
  );
}

export default App;
