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
	const wordsToDigits = {
		zero: 0,
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
	};

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

			// check if character is a digit
			if (isDigit(line[i])) {
				digit1 = line[i];
				foundFirst = true;
			} else {
				// check if current position in line starts with a spelled out number
				for (const word in wordsToDigits) {
					if (line.startsWith(word, i)) {
						digit1 = wordsToDigits[word];
						foundFirst = true;
					}
				}
			}
		}

		// search backward for second digit, one character at a time
		let foundSecond = false;
		for (let i = line.length - 1; i >= 0; i--) {
			if (foundSecond) {
				break;
			}

			// check if character is a digit
			if (isDigit(line[i])) {
				digit2 = line[i];
				foundSecond = true;
			} else {
				// check if current position in line starts with a spelled out number
				for (const word in wordsToDigits) {
					if (line.startsWith(word, i)) {
						digit2 = wordsToDigits[word];
						foundSecond = true;
					}
				}
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

function isDigit(str) {
	return Number.isInteger(Number(str));
}

console.log(`part1: ${await part1()}`);
console.log(`part2: ${await part2()}`);
