function encrypt() {
    const text = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value) % 26;
    const result = document.getElementById('result');
    result.textContent = 'Encrypted Text: ' + caesarCipher(text, shift);
}

function decrypt() {
    const text = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value) % 26;
    const result = document.getElementById('result');
    result.textContent = 'Decrypted Text: ' + caesarCipher(text, -shift);
}

function caesarCipher(str, shift) {
    return str.replace(/[a-z]/gi, function(char) {
        const code = char.charCodeAt(0);
        let base = (char.toLowerCase() === char) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        let newChar = String.fromCharCode(((code - base + shift) % 26) + base);
        return newChar;
    });
}
