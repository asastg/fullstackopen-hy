import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ onClcik, text }) => <button onClick={onClcik}>{text}</button>;
const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left + 1 });
  };
  const handleRightClick = () => {
    setClicks({ ...clicks, right: clicks.right + 1 });
  };

  return (
    <>
      {clicks.left}
      <Button onClcik={handleLeftClick} text="left" />
      <Button onClcik={handleRightClick} text="right" />
      {clicks.right}
    </>
  );
};
export default App;
