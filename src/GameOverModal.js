import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Emoji from 'a11y-react-emoji';

function GameOverModal(props) {
	const { show, gameReset, gameOutcome, secretWord, difficultyLevel } = props;

	return (
		<Modal
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header className="justify-content-center">
				<Modal.Title id="contained-modal-title-vcenter" className="text-center">
					Game Over
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex justify-content-center">
				{gameOutcome === 'USER_LOST' ? (
					<div>
						<h2>
							Computer has won. Try again!
							<Emoji symbol="😥" className="ml-3 emoji" />
						</h2>
						<h5 className="text-center mb-0">
							The secret word was {secretWord}
						</h5>
					</div>
				) : (
					<h2>
						You have won! Congrats!{' '}
						<Emoji symbol="🎉" className="ml-3 emoji " />
					</h2>
				)}
			</Modal.Body>
			<Modal.Footer className="justify-content-center">
				<Button variant="warning" onClick={(e) => gameReset(difficultyLevel, e)}>
					Play Again
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default GameOverModal;
