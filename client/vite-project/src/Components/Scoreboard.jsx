import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function Scoreboard() {
    const [score,setscore]=useState([]);
    const[ newsocket,setnewsocket]=useState(null);
    useEffect(()=>{
        const Socket=io("http://localhost:3000")
        Socket.on("connect",()=>{
            console.log("connected with teh socket");
            
        })
          Socket.on("player:update", (data) => {
      setscore(data);
      s
    });
    setnewsocket(Socket);
    return ()=>Socket.disconnect();

    },[]);
  return (
    <div>
        <ul>
            {
                score.map((i,j)=>(
                    <li key={j}>
                        {i.name}-{i.score}
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Scoreboard