const cryptedInput = document.querySelector("#crypted");
const textInput = document.querySelector("#text");
const keyInput = document.querySelector("#key");

// Event listeners

textInput.addEventListener("input", encryptHandle);
keyInput.addEventListener("input", encryptHandle);

// Handlers

/**
 * Encrypt handle
 */
function encryptHandle() {
	const text = textInput.value;
	const key = Number(keyInput.value);
	cryptedInput.value = encrypt(text, Number(key));
}

/**
 * Change handle
 */
function changeHandle() {
	const result = resultInput.innerHTML;
	textInput.value = result;
	encryptHandle();
}

// Helpers

/**
 * Get moved array
 * @param {array} arr
 * @param {int} key
 * @returns {array}
 */
function getMovedArray(arr, key) {
	key = Math.abs(key) > arr.length - 1 ? key % arr.length : key;
	return [...arr].reverse().map((_, index, array) => {
		index -= key;
		if (index < 0) {
			index += array.length;
		}

		if (index >= array.length) {
			index -= array.length;
		}

		return array[index];
	});
}

/**
 * Encrypt string
 * @param {string} str
 * @param {int} key
 * @returns {string}
 */
function encrypt(str, key) {
	const chars = getChars();
	const movedChars = getMovedArray(chars, key);
	return Array.from(str)
		.map((char) => {
			let newChar = movedChars[chars.indexOf(char.toLowerCase())];
			return isUpper(char) ? newChar.toUpperCase() : newChar;
		})
		.join("");
}

/**
 * Get chars array
 * @returns {array}
 */
function getChars() {
	return Array.from("abcdefghijklmonpqrstuvwxyz");
}

/**
 * Is upper
 * @param {string} char
 * @returns {bool}
 */
function isUpper(char) {
	return char === char.toUpperCase();
}
