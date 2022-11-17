import React from "react";
import withJokeListClass from "./JokeListClass";
import './JokeClass.css';


const Joke = props =>  ( 
            <div className="Joke">
              <div className="Joke-votearea">
                <button onClick={() => props.onUpVote(props.id)}>
                  <i className="fas fa-thumbs-up" />
                </button>
        
                <button onClick={() => props.onDownVote(props.id)}>
                  <i className="fas fa-thumbs-down" />
                </button>
        
                {props.votes}
              </div>
        
              <div className="Joke-text">{props.text}</div>
            </div>
          
);

export default withJokeListClass(Joke);

