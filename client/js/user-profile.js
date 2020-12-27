const hostname = 'http://localhost:3000';
const url = window.location.href;
const reqID = url.substring(url.lastIndexOf('/') + 1);

axios.get(new URL(`/user-info/${reqID}`, hostname)).then(res => {
  
  $("#profile-name").text(res.data.name);
  $("#profile-email").text(res.data.email);
  $("#profile-picture").attr("src", res.data.picture);

}).catch(err => {
  console.log('error:', err);

  if (err.response.status === 308) {
    window.location.href = '/dashboard';
  }
});