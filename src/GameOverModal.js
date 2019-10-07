import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Emoji from 'a11y-react-emoji';

function GameOverModal(props) {
	const { show, gameReset, gameOutcome, secretWord } = props;

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
							<Emoji symbol="😞" />
						</h2>
						<p>The secret word was {secretWord}</p>
					</div>
				) : (
					<h2>
						You have won! Congrats! <Emoji symbol="🎉" />
					</h2>
				)}
			</Modal.Body>
			<Modal.Footer className="justify-content-center">
				<Button variant="warning" onClick={gameReset}>
					Play Again
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default GameOverModal;
