const hostname = 'http://localhost:3000';
const url = window.location.href;
const otherID = new URL(url).searchParams.get('userID');

// Utility function for changing status of talked to
const updateStatus = (status) => {
  if (status === 'no' || status === 'pending') {
    $('#not-talked-to').show();
    $('#not-talked-to').css('display', 'flex');

    if (status === 'pending') {
      $('#talk-to-instructions').text('Your claim is pending.');
      $('#claim-talked-to').prop('disabled', true);
    }

  } else if (status === 'yes') {
    $('#talked-to').show();
  }
}

// Handle for button click "claim talked to"
const claimTalkedTo = () => {
  axios.post(new URL(`/talked-to?userID=${otherID}`, hostname)).then(res => {
    updateStatus('pending');
  });
};

axios.get(new URL(`/user-info?userID=${otherID}`, hostname)).then(res => {
  $('#profile-name').text(res.data.name);
  $('#profile-email').text(res.data.email);
  $('#profile-picture').attr('src', res.data.picture);

}).catch(err => {
  //console.log('error:', err.response);
  if (err.response) {
    if (err.response.status === 400) {
      window.location.href = '/dashboard';

    } else if (err.response.status === 404) {
      window.location.href = '/directory';
    }
  }
});

axios.get(new URL(`/user-bio?userID=${otherID}`, hostname)).then(res => {
  $('#profile-bio').text(res.data.bio);
}).catch(err => {
  
});

axios.get(new URL(`/did-talk-to?userID=${otherID}`, hostname)).then(res => {
  console.log(res);
  updateStatus(res.data.status);
});