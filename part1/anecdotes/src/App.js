import { useState } from "react";

const App = () => {
  const randRange = (min, max) => {
    // **Function taken from Mozilla Docs**
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const addVote = (anecdoteNum) => {
    const arr = [...votes];
    arr[anecdoteNum]++;
    setVotes(arr);
  };
  const arrMax = (arr) => {
    let temp = 0;
    arr.forEach((element) => {
      if (element > temp) temp = element;
    });
    return temp;
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <br />
      Votes for current anecdote: {votes[selected]}
      <br />
      <button
        onClick={() => {
          setSelected(randRange(0, anecdotes.length));
        }}
      >
        Next anecdote
      </button>
      <button
        onClick={() => {
          addVote(selected);
          console.log(votes);
        }}
      >
        Upvote
      </button>
      <h1>Anecdote with most votes:</h1>
      <br />
      {anecdotes[votes.lastIndexOf(arrMax(votes))]} <br />
      Votes: {arrMax(votes)}
    </div>
  );
};

export default App;
