import { useState } from 'react';
import './App.css';


const Try = ({ tryInfo }) =>{
  return(
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
}

const getNumbers = ()=> {
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i +=1 ){
    const chosen = candidate.splice(Math.floor(Math.random()*(9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}


function App() {

  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [tries, setTries] = useState([]);
  const [answer, setAnswer] = useState(getNumbers());

  const onSubmitForm = (e)=>{
    e.preventDefault();
    if(value === answer.join('')){
      setResult = '홈런!'
      setTries((prevTries) => {
        return [...prevTries, { try : value, result: '홈런!'}]
      }) 
      alert('reload');
      setValue = ('');
      setAnswer = (getNumbers());
      setTries = ([]);
    } else {
      const answerArray = value.split('').map((v)=> parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9){
        setResult( 'ddd ${answer.join(',')}dddd');
        alert('restart');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);    
      } else {
        for(let i = 0; i < 4; i +=1 ){
          if(answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        setTries((prevTries) => [...prevTries, { try : value, result: '${strike} S, ${ball} B'}])  
        setValue('');
    }}
  };

  const onChangeInput = (e)=>{
    console.log(answer)
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit = {onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도 횟수 : {tries.lenght}</div>
      <ul>
        {tries.map((v, i)=>{
          return(
           <div className='Try' key={'${i=1}차시도 :'} tryInfo={v} />
          )
          
        })}
        
      </ul>
    </>
  );
}

export default App;
