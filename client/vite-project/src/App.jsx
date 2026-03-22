import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const [input, setInput] = useState({
    name: "",
    score: "",
  });

  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
    });

 
    newSocket.on("players:update", (data) => {
      setPlayers(data);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPlayer = {
      ...input,
      score: Number(input.score),
    };


    socket.emit("player:add", newPlayer);

    setInput({
      name: "",
      score: "",
    });
  }

  return (
    <div>
      <h2>Leaderboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Player Name"
          value={input.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="score"
          placeholder="Score"
          value={input.score}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>

      <h3>Players</h3>
      <ul>
        {players.map((p, i) => (
          <li key={i}>
            {p.name} - {p.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;