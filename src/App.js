import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LetterButtons from './LetterButtons';
import GameOverModal from './GameOverModal';
import UIfx from 'uifx';
import saddertrombones from './sounds/saddertrombones.mp3';
import piglevelwin from './sounds/piglevelwin.mp3';

const sadSound = new UIfx(saddertrombones);
const happySound = new UIfx(piglevelwin);

class App extends Component {
	state = {
		secretWord: [],
		currentWord: [],
		incorrectGuesses: [],
		remainingGuesses: 6,
		modalShow: false,
		resetCount: 0,
		gameOutcome: ''
	};

	componentDidMount() {
		this.gameReset();
	}

	handleCheckLetter = (letter) => {
		const { secretWord, currentWord, remainingGuesses } = this.state;
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

		if (currentWord.indexOf('_') === -1) {
			//all letters have been guessed
			//user won
			this.gameOver('USER_WON');
		}

		if (!found) {
			this.setState((currentState) => ({
				remainingGuesses: currentState.remainingGuesses - 1
			}));
			this.setState((currentState) => ({
				incorrectGuesses: [...currentState.incorrectGuesses, letter]
			}));
			if (remainingGuesses - 1 === 0) {
				//user ran out of allowed guesses
				this.gameOver('USER_LOST');
			}
		}
	};

	gameOver = (outcome) => {
		//show modal
		if (outcome === 'USER_LOST') {
			this.setState({
				modalShow: true,
				gameOutcome: 'USER_LOST'
			});
			sadSound.setVolume(0.6);
			sadSound.play();
		} else {
			this.setState({
				modalShow: true,
				gameOutcome: 'USER_WON'
			});
			happySound.setVolume(0.6);
			happySound.play();
		}
	};

	gameReset = () => {
		let currentWord = [];
		//generate a random number to pick a new word each time
		const randomNum = Math.floor(Math.random() * 16000 + 1);
		//call API, pick a secretWord
		fetch(
			`http://localhost:5000/words?minLength=3&count=1&difficulty=1&start=${randomNum}`
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`Network response was not ok: ${response.status}, ${response.statusText}`
					);
				}
				return response.text();
			})
			.then((secretWord) => {
				console.log(secretWord);
				[...secretWord].forEach(() => {
					currentWord.push('_');
				});
				this.setState((currentState) => ({
					secretWord: [...secretWord.toUpperCase()],
					currentWord,
					incorrectGuesses: [],
					remainingGuesses: 6,
					modalShow: false,
					resetCount: currentState.resetCount + 1,
					gameOutcome: ''
				}));
			})
			.catch((error) => console.error(error));
	};

	render() {
		const {
			currentWord,
			remainingGuesses,
			incorrectGuesses,
			modalShow,
			resetCount,
			gameOutcome,
			secretWord
		} = this.state;

		return (
			<Container>
				<Row className="justify-content-center mb-3">
					<h1 className="display-2">{currentWord.join('  ')}</h1>
				</Row>
				<Row className="justify-content-center mb-3">
					<Col xs={10}>
						{/* key attr is used here to reset the internal state of letter buttons when game is over
						See https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
						for more deets*/}
						<LetterButtons
							handleCheckLetter={this.handleCheckLetter}
							key={resetCount}
						/>
					</Col>
				</Row>
				<Row className="justify-content-center mb-3">
					<Col xs={10}>
						<h3>Remaining incorrect guesses: {remainingGuesses}</h3>
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
				<Row className="justify-content-center mb-3 text-center">
					<Col xs={10}>
						{/* 16.67 is 1/6 of 100 - there are 6 incorrect guesses allowed */}
						<ProgressBar
							variant="warning"
							now={remainingGuesses * 16.67}
							label={remainingGuesses}
							className="mb-3"
						/>
						<img
							src={`flower${remainingGuesses}.svg`}
							alt=""
							height="400px"
							width="400px"
						/>
					</Col>
				</Row>
				<GameOverModal
					show={modalShow}
					gameReset={this.gameReset}
					gameOutcome={gameOutcome}
					secretWord={secretWord}
				/>
			</Container>
		);
	}
}

export default App;
