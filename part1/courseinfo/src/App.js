const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};
const Content = (props) => {
  return (
    <>
      <Part part={props.info[0].name} exercise={props.info[0].exercises} />
      <Part part={props.info[1].name} exercise={props.info[1].exercises} />
      <Part part={props.info[2].name} exercise={props.info[2].exercises} />
    </>
  );
};
const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.info[0].exercises +
          props.info[1].exercises +
          props.info[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Content info={course.parts} />
      <Total info={course.parts} />
    </div>
  );
};

export default App;
