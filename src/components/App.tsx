import React, { useState } from 'react';
import '../css/App.css';
import InputForm from './form/InputForm';
import Output from './form/Output';

type InputObject = {startDate: string, startTime: string, periodStartDate: string, periodStartTime: string, endDate: string, endTime: string, numUsers: number, price: number, couponRate?: number}

function App() {
  const [input, setInput] = useState<InputObject>();

  return (
    <div className="App text-center">
      <InputForm setInput={setInput} />
      {input !== undefined && <Output input={input} />}
    </div>
  );
}

export default App;
