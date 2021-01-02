const hostname = 'http://localhost:3000';
const url = window.location.href;
const reqID = new URL(url).searchParams.get('userID');

axios.get(new URL(`/user-info?userID=${reqID}`, hostname)).then(res => {
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

axios.get(new URL(`/user-bio?userID=${reqID}`, hostname)).then(res => {
  $('#profile-bio').text(res.data.bio);
}).catch(err => {
  //console.log(err);
});