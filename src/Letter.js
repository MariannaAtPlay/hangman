import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Letter extends Component {
	state = {
		guessed: false
	};

	render() {
		const { guessed } = this.state,
			{ letter } = this.props;

		return (
			<Button variant="warning" disabled={guessed}>
				{letter}
			</Button>
		);
	}
}

export default Letter;
