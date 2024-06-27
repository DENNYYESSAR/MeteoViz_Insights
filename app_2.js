document.addEventListener('DOMContentLoaded', function() {
    // Handle signup form submission
    document.getElementById('sign-up-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User registered successfully') {
                alert('Sign-up successful!');
                document.querySelector('.sign-up-view').style.display = 'none';
                document.querySelector('.login-view').style.display = 'block';
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful') {
                alert('Login successful!');
                document.querySelector('.auth-views').style.display = 'none';
                document.querySelector('.weather-view').style.display = 'block';
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
