import React from "react";
import axios from "axios";
import './JokeListClass.css';

const withJokeListClass =  Component => {
    return class extends React.Component {
        // format will be {id, joke, votes}
        state = {
            jokes: [],
            numJokesToGet: 10
        }
    
        async componentDidMount () {
            let j = [...this.state.jokes];
            let seenJokes = new Set();
            try {
              while (j.length < this.state.numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                  headers: { Accept: "application/json" }
                });
                let { status, ...jokeObj } = res.data;
        
                if (!seenJokes.has(jokeObj.id)) {
                  seenJokes.add(jokeObj.id);
                  j.push({ ...jokeObj, votes: 0 });
                } else {
                  console.error("duplicate found!");
                }
              }
              this.setState({...this.state, jokes: [...j]});
            } catch (e) {
              console.log(e);
            }
        }
    
        async componentDidUpdate (prevProps) {
            if (this.state.jokes.length === 0){
                let j = [...this.state.jokes];
                let seenJokes = new Set();
                try {
                  while (j.length < this.state.numJokesToGet) {
                    let res = await axios.get("https://icanhazdadjoke.com", {
                      headers: { Accept: "application/json" }
                    });
                    let { status, ...jokeObj } = res.data;
            
                    if (!seenJokes.has(jokeObj.id)) {
                      seenJokes.add(jokeObj.id);
                      j.push({ ...jokeObj, votes: 0 });
                    } else {
                      console.error("duplicate found!");
                    }
                  }
                  this.setState({...this.state, jokes: [...j]});
                } catch (e) {
                  console.log(e);
                }
            }
        }

        decrement = (id) => {
            const updatedJokes = this.state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes - 1 } : j));
            let sortedJokes = [...updatedJokes].sort((a, b) => b.votes - a.votes);
            this.setState({jokes: [...sortedJokes]});
        };
    
        increment = (id) => {
            const updatedJokes = this.state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + 1 } : j));
            let sortedJokes = updatedJokes.sort((a, b) => b.votes - a.votes);
            this.setState({jokes: [...sortedJokes]});   
        };
    
        generateNewJokes = () => {
            this.setState({jokes: []});
        }

        renderComponents = () => {
            const jokeComponents = this.state.jokes.map(j => {
                <Component
                    {...this.props}
                    text={j.joke}
                    votes={j.votes}
                    onUpVote={this.increment}
                    onDownVote={this.decrement}
                />
            return jokeComponents;
            });
        }
    
        // add first jokes array will be empty, therefore, no Jokes will be rendered
        // after updating jokes, then the function will rerender
        // Where to loop over the joke component?  
        render () {
            return (
                <div className="JokeList">
                    <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                    Get New Jokes
                    </button>
                    {/* {this.state.jokes && this.renderComponents} */}
                    {this.state.jokes.map(j => {
                        return (<Component
                            {...this.props}
                            id={j.id}
                            text={j.joke}
                            votes={j.votes}
                            onUpVote={this.increment}
                            onDownVote={this.decrement}
                        />);
                    })}

                </div>
            );
        }
    }

} 

export default withJokeListClass;

{/* function vote(id, delta) {
    setJokes(allJokes =>
      allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  } */}

{/* only run after the component is mounted */}
{/* run every time after that */}
{/* if (jokes.length) {
    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
    return (

  
        {sortedJokes.map(j => (
          <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
        ))}
      </div>
    ); */}