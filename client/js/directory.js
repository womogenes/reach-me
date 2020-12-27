const hostname = 'http://localhost:3000';

axios.get(new URL('/all-users', hostname)).then(res => {

  res.data.forEach(user => {
    const userDiv = $('<div>', {
      class: 'user-div'
    });
    const userPicture = $('<img>', {
      src: user.picture,
      class: 'user-picture'
    });
    userDiv.append(userPicture);
    const userLink = $('<a>', {
      text: user.name,
      href: `/user/${user.userID}`,
      class: 'user-link'
    });
    userDiv.append(userLink);

    $('#user-list').append(userDiv);
  });
});