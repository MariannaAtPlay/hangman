import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class WelcomeModal extends Component {
	state = {
		validated: false
	};

	levelInput = React.createRef();

	handleSubmit = (event) => {
		const form = event.currentTarget;
		const { handleLevelChange } = this.props;

		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			this.setState({
				validated: true
			});
		} else {
			const level = this.levelInput.current.value;
			handleLevelChange(level);
		}
	};

	render() {
		const { show } = this.props;
		const { validated } = this.state;

		return (
			<Modal
				show={show}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Form noValidate validated={validated} onSubmit={this.handleSubmit}>
					<Modal.Header className="justify-content-center">
						<Modal.Title
							id="contained-modal-title-vcenter"
							className="text-center"
						>
							Welcome to the Word Guessing Game!
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className="d-flex justify-content-center">
						<Form.Group controlId="levelInput">
							<Form.Label>
								Select Difficulty Level (1 = EASY and 10 = HARD)
							</Form.Label>
							<Form.Control
								ref={this.levelInput}
								type="number"
								min="1"
								max="10"
								size="lg"
								required
								className="text-center"
							/>
							<Form.Control.Feedback type="invalid">
								Difficulty Level is required.
							</Form.Control.Feedback>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer className="justify-content-center">
						<Button variant="warning" type="submit">
							Submit
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		);
	}
}

export default WelcomeModal;
