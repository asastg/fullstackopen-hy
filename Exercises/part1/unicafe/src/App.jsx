import { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Item = ({ result, value }) => {
  return (
    <>
      <p>
        {result} {value}
      </p>
    </>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text={'good'} />
      <Button handleClick={handleClickNeutral} text={'neutral'} />
      <Button handleClick={handleClickBad} text={'bad'} />
      <h1>Statistics</h1>
      <Item result={'good'} value={good} />
      <Item result={'neutral'} value={neutral} />
      <Item result={'bad'} value={bad} />
    </div>
  );
};

export default App;
