import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Scoreboard() {
  const [score, setscore] = useState([]);

  useEffect(() => {
    const Socket = io("http://localhost:3000");

    Socket.on("connect", () => {
      console.log("connected with the socket");
      console.log(Socket.id);
    });

    Socket.on("players:update", (data) => {
      setscore(data);
    });

    return () => Socket.disconnect();
  }, []);

  return (
    <div>
      <ul>
        {score.map((i, j) => (
          <li key={j}>
            {i.name} - {i.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scoreboard;
