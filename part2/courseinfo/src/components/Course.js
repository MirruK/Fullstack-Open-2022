const Part = (props) => {
  return (
    <li key={props.id}>
      {props.part} {props.exercise}
    </li>
  );
};

const Header = ({ info }) => {
  return (
    <li key={info.key}>
      <h1>{info.name}</h1>
    </li>
  );
};
const Content = ({ info }) => {
  return (
    <li key={info.key}>
      <ul>
        {info.map((item) => (
          <Part part={item.name} exercise={item.exercises} />
        ))}
      </ul>
    </li>
  );
};
const Total = ({ info }) => {
  const exercises = info.map((item) => item.exercises);
  return (
    <li key={info.key}>
      Number of exercises {exercises.reduce((acc, curr) => acc + curr, 0)}
    </li>
  );
};

const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header info={course} />
      <Content info={course.parts} />
      <Total info={course.parts} />
    </div>
  );
};

export default Course;
