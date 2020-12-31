const hostname = 'http://localhost:3000';

axios.get(new URL('/my-info', hostname)).then(res => {
  console.log(res);

  $("#profile-name").text(res.data.name);
  $("#profile-email").text(res.data.email);
  $("#profile-picture").attr("src", res.data.picture);
});

axios.get(new URL('/my-bio', hostname)).then(res => {
  console.log(res);

  $("#profile-bio").text(res.data.bio);
})

const editBio = (event) => {
  event.preventDefault();
  
  const newBio = $("#bio-input").val();
  console.log(newBio);
  
  return false;
};