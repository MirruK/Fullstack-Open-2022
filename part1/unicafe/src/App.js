import { useState } from "react";

const Button = ({ text, fun }) => {
  return (
    <>
      <button onClick={fun}>{text}</button>
    </>
  );
};

const StatisticLine = ({ content, text }) => {
  return (
    <tr>
      <td>
        {text} {content}
      </td>
    </tr>
  );
};

const Statistics = ({ ratings }) => {
  const { good, neutral, bad } = ratings;
  const totalRatings = () =>
    [good, neutral, bad].reduce((acc, curr) => acc + curr);
  const ratingAvg = () =>
    good + neutral + bad != 0 ? (good - bad) / (good + neutral + bad) : 0;
  const percentPositive = () =>
    good + neutral + bad != 0
      ? `${good / (good + neutral + bad)}%`
      : "no votes";
  if (good + neutral + bad != 0) {
    return (
      <div>
        <h1> Statistics </h1>
        <table>
          <tbody>
            <StatisticLine content={good} text={"Good:"} />
            <StatisticLine content={neutral} text={"Neutral:"} />
            <StatisticLine content={bad} text={"Bad:"} />
            <StatisticLine content={totalRatings()} text={"Total Ratings:"} />
            <StatisticLine content={ratingAvg()} text={"Average Rating:"} />
            <StatisticLine
              content={percentPositive()}
              text={"Percent Positive Votes:"}
            />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <div>No votes gathered</div>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const addRating = (type, fun) => {
    return () => fun(type + 1);
  };

  return (
    <div className="App">
      <h1> Give feedback </h1>
      <Button text={"good"} fun={addRating(good, setGood)} />
      <Button text={"neutral"} fun={addRating(neutral, setNeutral)} />
      <Button text={"bad"} fun={addRating(bad, setBad)} />
      <Statistics ratings={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  );
};

export default App;
