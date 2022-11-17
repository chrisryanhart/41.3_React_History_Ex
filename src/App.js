import React from "react";
import JokeClass from "./JokeClass";

function App() {
  return (
    <div className="App">
      <JokeClass numJokesToGet={10} />
    </div>
  );
}

export default App;
