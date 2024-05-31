document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    const messageDiv = document.getElementById('message');

    if (response.ok) {
        localStorage.setItem('token', result.token);
        messageDiv.textContent = 'Login successful!';
    } else {
        messageDiv.textContent = 'Login failed: ' + result.message;
    }
});

// Load the Google API client library
function onGoogleSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    // Send this data to your backend for further processing
}

// Initialize the Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId      : 'YOUR_APP_ID', // Replace 'YOUR_APP_ID' with your Facebook App ID
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
    });
    FB.AppEvents.logPageView();   
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function facebookLogin() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', {fields: 'name,email'}, function(response) {
                console.log('Successful login for: ' + response.name);
                console.log('Email: ' + response.email);
                // Send this data to your backend for further processing
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'public_profile,email'});
}

function emailPhoneLogin() {
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    if(email || phone) {
        console.log('Email: ' + email);
        console.log('Phone: ' + phone);
        // Send this data to your backend for further processing
    } else {
        alert('Please enter email or phone number');
    }
}
