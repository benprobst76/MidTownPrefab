function send(event) {
    event.preventDefault();
    var user = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    fetch("https://192.168.2.165:443/login99", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user, password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(html => {
        document.head.innerHTML = html[1];
        document.body.innerHTML = html[0];
        const script1 = document.createElement('script');
        script1.innerHTML = html[2];
        document.body.appendChild(script1);
        history.replaceState({ page: 1 }, "", html[3]);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}