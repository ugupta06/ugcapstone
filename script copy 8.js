document.getElementById('imageInput').addEventListener('change', function() {
    const reader = new FileReader();
    reader.onload = function() {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
        };
        img.src = reader.result;
        document.getElementById('resultImage').src = reader.result; // Display image
    };
    reader.readAsDataURL(this.files[0]);
});

function embedText() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const text = document.getElementById('textToHide').value;
    const binaryText = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    let dataIndex = 0;

    for (let i = 0; i < binaryText.length; i++) {
        const bit = binaryText[i];
        if (dataIndex < image.data.length) {
            image.data[dataIndex] = (image.data[dataIndex] & ~1) | parseInt(bit); // Embed bit into the least significant bit of the pixel
            dataIndex += 4; // Move to the next pixel's red channel
        } else {
            break;
        }
    }
    
    ctx.putImageData(image, 0, 0);
    document.getElementById('resultImage').src = canvas.toDataURL();
}

function extractText() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let binaryText = '';
    let extractedText = '';

    for (let i = 0; i < image.data.length; i += 4) {
        const bit = image.data[i] & 1;
        binaryText += bit.toString();
        if (binaryText.length === 8) {
            const charCode = parseInt(binaryText, 2);
            if (charCode === 0) break; // Assuming text ends when a null character is found
            extractedText += String.fromCharCode(charCode);
            binaryText = ''; // Reset for next character
        }
    }

    document.getElementById('extractedText').innerText = extractedText;
}
