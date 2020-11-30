const hostname = 'http://localhost:3000';

axios.get(new URL('/dashboard', hostname)).then(res => {
  console.log(res.data);
});