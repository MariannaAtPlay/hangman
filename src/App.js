import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		word: [],
		currentGuess: [],
		incorrectGuesses: [],
		remainingGuesses: 6
	};

	componentDidMount() {
		//call API, pick a word
		const word = 'wild',
			currentGuess = [];

		[...word].forEach(() => {
			currentGuess.push('_');
		});
		this.setState({
			word: [...word],
			currentGuess
		});
	}

	render() {
		const { word, currentGuess, remainingGuesses } = this.state;
		return <h1>{currentGuess.join(' ')}</h1>;
	}
}

export default App;
