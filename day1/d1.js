import { open } from 'node:fs/promises';

async function part1() {
	const calibrationInput = await open('input.txt');
	const calibrationData = [];
	let calibrationTotal = 0;

	for await (const line of calibrationInput.readLines()) {
		calibrationData.push(getCalibrationFromLine(line));
	}

	for (const calibration of calibrationData) {
		calibrationTotal += calibration;
	}

	return calibrationTotal;
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

async function part2() {
	const calibrationInput = await open('input.txt');
	const calibrationData = [];
	let calibrationTotal = 0;

	// loop through each line
	for await (const line of calibrationInput.readLines()) {
		let digit1;
		let digit2;

		// search forward for first digit, one character at a time
		let foundFirst = false;
		for (let i = 0; i < line.length; i++) {
			if (foundFirst) {
				break;
			}

			const result = searchForDigit(line.substring(i));

			if (result !== undefined) {
				digit1 = result;
				foundFirst = true;
			}
		}

		// search backward for second digit, one character at a time
		let foundSecond = false;
		for (let i = line.length - 1; i >= 0; i--) {
			if (foundSecond) {
				break;
			}

			const result = searchForDigit(line.substring(i));

			if (result !== undefined) {
				digit2 = result;
				foundSecond = true;
			}
		}

		// add number to calibrationData
		calibrationData.push(Number(`${digit1}${digit2}`));
	}

	// calculate total
	for (const calibration of calibrationData) {
		calibrationTotal += calibration;
	}

	return calibrationTotal;
}

function searchForDigit(str) {
	let digit;
	const wordsToDigits = {
		zero: '0',
		one: '1',
		two: '2',
		three: '3',
		four: '4',
		five: '5',
		six: '6',
		seven: '7',
		eight: '8',
		nine: '9',
	};

	if (Number.isInteger(Number(str[0]))) {
		digit = str[0];
	} else {
		for (const word in wordsToDigits) {
			if (str.startsWith(word)) {
				digit = wordsToDigits[word];
			}
		}
	}

	return digit;
}

console.log(`part1: ${await part1()}`);
console.log(`part2: ${await part2()}`);
