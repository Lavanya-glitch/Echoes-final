const baseUrls = 'api/v1';

const createEntry = (e) => {
  e.preventDefault();
  const form = document.forms.create;
  const title = form.title.value;
  const body = tinyMCE.get('body').getContent();
  // .replace(/<[^>]*>/g, '')
  // const notify = document.getElementById('notify');


  fetch(`${baseUrls}/entries`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        console.log(data);
        console.log(body);
        if (res.status === 401) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'You must be logged in to view this page';
          setTimeout(() => {
            window.location.replace('login');
          }, 2000);
        }
        if (res.status !== 201) {
          notify.style.display = 'block';
          notify.style.background = 'hotpink';
          notify.innerHTML = 'Please fill all fields correctly';
          setInterval(() => {
            notify.style.display = 'none';
          }, 2000);
        }
        if (res.status === 201) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'Entry created successfully';
          setTimeout(() => {
            window.location.replace('home');
          }, 2000);
        }
      })
      .catch(err => console.error(err)));
};

document.getElementById('create').addEventListener('submit', createEntry);
