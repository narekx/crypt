const encryptButton = document.querySelector("#encrypt");
const decryptButton = document.querySelector("#decrypt");
const changeButton = document.querySelector("#change");
const textInput = document.querySelector("#text");
const keyInput = document.querySelector("#key");
const resultInput = document.querySelector("#result");

// Event listeners

encryptButton.addEventListener("click", encryptHandle);
decryptButton.addEventListener("click", decryptHandle);
changeButton.addEventListener("click", changeHandle);

// Handlers

/**
 * Encrypt handle
 */
function encryptHandle() {
	const text = textInput.value;
	const key = Number(keyInput.value);
	resultInput.innerHTML = encrypt(text, Number(key));
}

/**
 * Decrypt handle
 */
function decryptHandle() {
	const text = textInput.value;
	const key = Number(keyInput.value);
	resultInput.innerHTML = decrypt(text, Number(key));
}

/**
 * Change handle
 */
function changeHandle() {
	const result = resultInput.innerHTML;
	textInput.value = result;
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
	return arr.map((_, index, array) => {
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
		.map(char => movedChars[chars.indexOf(char)])
		.join("");
}

/**
 * Decrypt string
 * @param {string} str 
 * @param {int} key 
 * @returns {string}
 */
function decrypt(str, key) {
	const chars = getChars();
	const movedChars = getMovedArray(chars, key);
	return Array.from(str)
		.map(char => chars[movedChars.indexOf(char)])
		.join("");
}

/**
 * Get chars array
 * @returns {array}
 */
function getChars() {
	return Array.from('abcdefghijklmonpqrstuvwxyz');
}