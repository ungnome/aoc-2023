import { open } from 'node:fs/promises';

async function main() {
	const calibrationInput = await open('input.txt');
	const calibrationData = [];
	let calibrationTotal = 0;

	for await (const line of calibrationInput.readLines()) {
		calibrationData.push(getCalibrationFromLine(line));
	}

	for (const calibration of calibrationData) {
		calibrationTotal += calibration;
	}

	console.log(calibrationTotal);
}

function getCalibrationFromLine(line) {
	let digit1;
	let digit2;

	for (const character of line) {
		if (Number.isInteger(Number(character))) {
			!digit1 ? (digit1 = character) : (digit2 = character);
		}
	}

	return !digit2 ? Number('' + digit1 + digit1) : Number('' + digit1 + digit2);
}
main();
