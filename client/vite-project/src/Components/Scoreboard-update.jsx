import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function EScoreboard() {
  const [newplayer, setnewplayer] = useState({
    name: "",
    score: ""
  });

  const [newSocket, setnewSocket] = useState(null);
  const [scoreList, setscoreList] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setnewplayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPlayer = {
      ...newplayer,
      score: Number(newplayer.score)
    };

    if (newSocket) {
      newSocket.emit("update", newPlayer);
    }
  }

  useEffect(() => {
    const Socket = io("http://localhost:3000",{
      auth:{
        token:localStorage.getItem("token")
      }
    });

    Socket.on("connect", () => {
      console.log("connected with socket id", Socket.id);
    });

    Socket.on("players:update", (data) => {
      setscoreList(data);
    });

    setnewSocket(Socket);

    return () => Socket.disconnect();
  }, []);

  return (
    <div>
   
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="playername"
          value={newplayer.name}
          onChange={handleChange}
        />

        <input
          name="score"
          type="number"
          placeholder="score"
          value={newplayer.score}
          onChange={handleChange}
        />
        <button type='submit'>Button</button>
      </form>
             <ul>
        {scoreList.map((i, j) => (
          <li key={j}>
            {i.name} - {i.score}
          </li>
        ))}
      </ul> 

  
    </div>
  );
}

export default EScoreboard;