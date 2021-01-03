const hostname = location.protocol + '//' + location.hostname + (location.port ? ':'+location.port: '');

// Handle for when submit edited bio is pressed
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

// Get basic info
axios.get(new URL('/my-info', hostname)).then(res => {
  $('#profile-name').text(res.data.name);
  $('#profile-email').text(res.data.email);
  $('#profile-picture').attr({
    src: res.data.picture,
    alt: `Your image`
  });
});

// Get bio
axios.get(new URL('/my-bio', hostname)).then(res => {
  $('#profile-bio').text(res.data.bio);
});

// Get tags
axios.get(new URL('/my-tags', hostname)).then(res => {
  console.log(res);

  console.log(res.data.tags);

  res.data.tags.forEach(tag => {
    const name = tag.name;
    const tagDiv = $('<div>', {
      class: 'tag'
    });
    const tagText = $('<p>', {
      class: 'tag-text',
      text: name
    });
    tagDiv.append(tagText);

    $('#tag-list').append(tagDiv);
  })
});