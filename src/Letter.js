import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Letter extends Component {
	state = {
		guessed: false
	};

	handleClick = () => {
		const { letter } = this.props;

		this.setState({
			guessed: true
		});
		this.props.handleCheckLetter(letter);
	};

	render() {
		const { guessed } = this.state,
			{ letter } = this.props;

		return (
			<Button
				variant="warning"
				size="lg"
				disabled={guessed}
				onClick={this.handleClick}
				className="mx-2 my-1"
			>
				{letter}
			</Button>
		);
	}
}

export default Letter;
