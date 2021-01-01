const hostname = 'http://localhost:3000';

const approveBio = (userID) => {
  axios.post(new URL(`/admin/${userID}`, hostname), res => {
    // Approved!
  });
}

axios.get(new URL('/admin/pending-bios', hostname)).then(res => {
  console.log(res.data);
  
  res.data.forEach(pendingBio => {
    const bioDiv = $('<div>', {
      class: 'bio-div'
    });
    const profileLink = $('<a>', {
      text: pendingBio.userID,
      href: `/user/${pendingBio.userID}`,
      class: 'profile-link'
    });
    bioDiv.append(profileLink);
    const bioText = $('<p>', {
      text: pendingBio.bio,
      class: 'bio-text'
    });
    bioDiv.append(bioText);
    const approveButton = $('<button>', {
      click: () => { approveBio(pendingBio.userID) },
      text: 'Approve',
      class: 'approve-button'
    })
    bioDiv.append(approveButton);

    $('#bio-list').append(bioDiv);
  });
}); 