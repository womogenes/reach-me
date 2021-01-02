const hostname = 'http://localhost:3000';

axios.get(new URL('/my-info', hostname)).then(res => {
  $('#profile-name').text(res.data.name);
  $('#profile-email').text(res.data.email);
  $('#profile-picture').attr({
    src: res.data.picture,
    alt: `Your image`
  });
});

axios.get(new URL('/my-bio', hostname)).then(res => {
  $('#profile-bio').text(res.data.bio);
})

const editBio = (event) => {
  event.preventDefault();
  
  const newBio = $('#bio-input').val();
  if (newBio) {
    let config = { 'headers': { 'Content-Type': 'application/json' } };
    let data = { newBio: newBio };

    axios.post(new URL('/edit-bio', hostname), data, config).then(res => {
      if (res.status === 204) {
        $('#bio-edit-status').text('Your updated bio will appear once approved.');
      }
    });
  }
  
  return false;
};