import "./App.css";
import Letter from "./Letter";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();

function App() {
  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/generator")
      .then((res) => res.json())
      .then(({ message }) => setData(Array.from(message)));
  }, []);

  socket.on("user", ({ user }) => {
    setUsers(user);
  });
  useEffect(() => {
    socket.on("new message", ({ data }) => {
      console.log(data, messages);
      setMessages((prevM) => [...prevM, data]);
    });
  }, []);

  function sendMessage() {
    socket.emit("messaging", { message: input });
  }

  return (
    <div>
      <div className="App">
        {/*<h1>{!data ? "Loading..." : data}</h1>
      <Letter letter="b"></Letter>*/}
        <div className="letter-container">
          {data.map((letter, index) => (
            <Letter letter={letter} key={index} offset={index}></Letter>
          ))}
        </div>
      </div>
      <div className="chat-container">
        <h1>Now with Socket.io</h1>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => sendMessage()}>Send</button>
        <h2>Users connected : {users}</h2>
        <div className="messages">
          {messages.map((m, index) => (
            <h3 key={index}>{m}</h3>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
