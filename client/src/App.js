import "./App.css";
import Letter from "./Letter";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/generator")
      .then((res) => res.json())
      .then(({ message }) => setData(Array.from(message)));
  }, []);

  return (
    <div className="App">
      {/*<h1>{!data ? "Loading..." : data}</h1>
      <Letter letter="b"></Letter>*/}
      <div className="letter-container">
        {data.map((letter, index) => (
          <Letter letter={letter} key={index} offset={index}></Letter>
        ))}
      </div>
    </div>
  );
}

export default App;
