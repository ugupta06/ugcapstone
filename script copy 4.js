function checkServer() {
    const url = document.getElementById('urlInput').value;
    const resultElement = document.getElementById('result');

    fetch(url, { mode: 'no-cors' })
        .then(response => {
            if (response.ok || response.type === 'opaque') {
                resultElement.innerHTML = `Server at <b>${url}</b> is reachable.`;
            } else {
                resultElement.innerHTML = `Failed to reach server at <b>${url}</b>.`;
            }
        })
        .catch(error => {
            resultElement.innerHTML = `Error reaching server at <b>${url}</b>. It may be down or your URL may be incorrect.`;
        });
}
