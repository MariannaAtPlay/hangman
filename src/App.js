import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LetterButtons from './LetterButtons';

class App extends Component {
	state = {
		secretWord: [],
		currentWord: [],
		incorrectGuesses: [],
		remainingGuesses: 6
	};

	componentDidMount() {
		//call API, pick a secretWord
		const secretWord = 'freedom',
			currentWord = [];

		[...secretWord].forEach(() => {
			currentWord.push('_');
		});
		this.setState({
			secretWord: [...secretWord.toUpperCase()],
			currentWord
		});
	}

	handleCheckLetter = (letter) => {
		const { secretWord, currentWord } = this.state;
		let found = false;

		//check if letter is part of the secretWord
		//if so, replace _ with the correctly guessed letter
		secretWord.forEach((currLetter, index) => {
			if (currLetter === letter) {
				currentWord[index] = letter;
				found = true;
			}
		});

		this.setState({
			currentWord
		});

		if (!found) {
			this.setState((currentState) => ({
				remainingGuesses: currentState.remainingGuesses - 1
			}));
			this.setState((currentState) => ({
				incorrectGuesses: [...currentState.incorrectGuesses, letter]
			}));
		}
	};

	render() {
		const { currentWord, remainingGuesses, incorrectGuesses } = this.state;

		return (
			<Container>
				<Row className="justify-content-center mb-3">
					<h1 className="display-2">{currentWord.join('  ')}</h1>
				</Row>
				<Row className="justify-content-center mb-3">
					<Col xs={10}>
						<LetterButtons handleCheckLetter={this.handleCheckLetter} />
					</Col>
				</Row>
				<Row className="justify-content-center mb-3">
					<Col xs={10}>
						<h3>Remaining incorrect guesses: {remainingGuesses}</h3>
					</Col>
				</Row>
				<Row className="justify-content-center mb-3">
					<Col xs={10}>
						{/* 16.67 is 1/6 of 100 - there are 6 incorrect guesses allowed */}
						<ProgressBar
							variant="warning"
							now={remainingGuesses * 16.67}
							label={remainingGuesses}
						/>
					</Col>
				</Row>
				<Row className="justify-content-center mb-3">
					<Col xs={10}>
						<h3>
							Letters guessed incorrectly:{' '}
							{incorrectGuesses.length
								? incorrectGuesses.join(', ')
								: 'none'}
						</h3>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
