
// OLD
export function openLoginView() {}

export function openProfileView() {}

export function openRegistrationView() {}

export async function userLogin(username, password){
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (response.ok) {
        localStorage.setItem('token', result.token);
        // #### PENDING -- Insert alert 
        console.log('Login successful');
    } else {
        // #### PENDING -- Insert alert 
        console.log('Login failed' + result.message);
    }
}

// // Load the Google API client library
// export async function onGoogleSignIn(googleUser) {
//     var profile = await googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId());
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail());
//     // Send this data to your backend for further processing
// }

// // Initialize the Facebook SDK
// window.fbAsyncInit = function() {
//     FB.init({
//         appId      : 'YOUR_APP_ID', // Replace 'YOUR_APP_ID' with your Facebook App ID
//         cookie     : true,
//         xfbml      : true,
//         version    : 'v10.0'
//     });
//     FB.AppEvents.logPageView();   
// };

// (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

// function facebookLogin() {
//     FB.login(function(response) {
//         if (response.status === 'connected') {
//             FB.api('/me', {fields: 'name,email'}, function(response) {
//                 console.log('Successful login for: ' + response.name);
//                 console.log('Email: ' + response.email);
//                 // Send this data to your backend for further processing
//             });
//         } else {
//             console.log('User cancelled login or did not fully authorize.');
//         }
//     }, {scope: 'public_profile,email'});
// }
