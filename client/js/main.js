function onSignIn(googleUser) {

  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  let idToken = googleUser.getAuthResponse().id_token;
  let config = {
    'headers': {
      'Content-Type': 'application/json'
    }
  };
  let data = {
    'idToken': idToken
  };

  axios.post('http://localhost:3000/login', data, config).then(
    res => {
      console.log(res.headers);
    }
  );
}

const signOut = () => {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}