const hostname = location.protocol + '//' + location.hostname + (location.port ? ':'+location.port: '');
let myTags = [];

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

// Badges
// Going to have title, description
const makeBadgeDiv = (badge) => {
  const badgeDiv = $('<div>', {
    class: 'badge'
  });
  const badgeTitle = $('<p>', {
    class: 'badge-title',
    text: badge.title
  });
  const badgeDescription = $('<p>', {
    class: 'badge-description',
    text: badge.description
  });

  badgeDiv.append(badgeTitle);
  badgeDiv.append(badgeDescription);

  return badgeDiv;
};

// Tags
const makeTagDiv = (tag, type) => {
  if (type === 'mine') {
    const name = tag.name;
    const tagDiv = $('<div>', {
      class: 'tag'
    });
    const tagText = $('<p>', {
      class: 'tag-text',
      text: name
    });
    tagDiv.append(tagText);
    const removeTag = $('<button>', {
      class: 'tag-button',
      text: '-'
    });
    removeTag.click(() => {
      tagDiv.remove();
      myTags = myTags.filter(t => t !== tag);
      axios.post('/remove-tags', { toRemove: [tag] });
    });
    tagDiv.append(removeTag);

    return tagDiv;

  } else {
    const tagDiv = $('<div>', {
      class: 'tag'
    });
    const tagText = $('<p>', {
      class: 'tag-text',
      text: tag.name
    });
    tagDiv.append(tagText);
    const addTag = $('<button>', {
      class: 'tag-button',
      text: '+'
    });
    addTag.click(() => {
      if (!myTags.some(t => t.name === tag.name)) {
        myTags.push(tag);
      } else {
        return;
      }
      $('#my-tag-list').append(makeTagDiv(tag, 'mine'));
      axios.post('/add-tags', { newTags: [tag] });
    });
    tagDiv.append(addTag);

    return tagDiv;
  }
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
  res.data.forEach(tag => {
    const tagDiv = makeTagDiv(tag, 'mine');
    $('#my-tag-list').append(tagDiv);
  });

  myTags = res.data;
});

// Get list of all tags
axios.get('/all-tags').then(res => {
  res.data.forEach(tag => {
    const tagDiv = makeTagDiv(tag, 'all');
    $('#available-tag-list').append(tagDiv);
  });
});

// Get badges
axios.get('/my-badges').then(res => {
  res.data.forEach(badge => {
    const badgeDiv = makeBadgeDiv(badge);
    $('#badge-list').append(badgeDiv);
  })
})