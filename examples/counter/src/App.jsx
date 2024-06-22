import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ onClcik, text }) => <button onClick={onClcik}>{text}</button>;
const App = () => {
  const [counter, Setcounter] = useState(0);
  console.log('rendering with counter value', counter);
  const increaseByOne = () => {
    console.log('increasing, value before', counter);
    Setcounter(counter + 1);
  };
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter);
    Setcounter(counter - 1);
  };
  const setToZero = () => {
    console.log('resetting to zero, value before', counter);
    Setcounter(0);
  };
  return (
    <>
      <Display counter={counter} />
      <Button onClcik={increaseByOne} text="plus" />
      <Button onClcik={setToZero} text="zero" />
      <Button onClcik={decreaseByOne} text="minus" />
    </>
  );
};
export default App;
