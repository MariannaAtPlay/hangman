import React from 'react';
import Letter from './Letter';

function LetterButtons(props) {
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	const buttons = [...letters].map((letter) => (
		<Letter
			letter={letter}
			handleCheckLetter={props.handleCheckLetter}
			key={letter}
		/>
	));

	return buttons;
}

export default LetterButtons;
