// script.js
function sendPrompt() {
    var prompt = document.getElementById('prompt').value;
    fetch('/chatgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = "<p><strong>Response:</strong> " + data.response + "</p>";
    });
}
