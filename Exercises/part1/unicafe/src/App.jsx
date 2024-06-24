import { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
);
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (!all) {
    return <>No feedback given</>;
  }
  return (
    <table>
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'all'} value={all} />
      <StatisticLine text={'average'} value={average()} />
      <StatisticLine text={'positive'} value={positive()} />
    </table>
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
  const all = good + neutral + bad;
  const average = () => {
    if (!all) {
      return 0;
    }
    return (good + bad * -1) / all;
  };
  const positive = () => {
    if (!all) {
      return 0;
    }
    return `${(good / all) * 100} %`;
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text={'good'} />
      <Button handleClick={handleClickNeutral} text={'neutral'} />
      <Button handleClick={handleClickBad} text={'bad'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  );
};

export default App;
