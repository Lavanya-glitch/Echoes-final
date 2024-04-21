// signup.js

function signup(e) {
  e.preventDefault();
  const form = document.getElementById('signup'); // Changed to use getElementById
  const email = form.email.value;
  const full_name = form.full_name.value;
  const password = form.password.value;
  const notify = document.getElementById('notify');

  const user = { full_name, email, password };

  fetch('http://localhost:3000/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to sign up');
      }
      return res.json();
    })
    .then(data => {
      // Handle the response data here
      localStorage.token = data.token; // Assuming your backend returns a token
      console.log('User signed up successfully');
      notify.style.background = 'rgb(106, 197, 106)';
      notify.style.display = 'block';
      notify.innerHTML = 'Account created successfully';
      setTimeout(() => {
        window.location.replace('home.html'); // Redirect to home page
      }, 2000);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
      notify.style.display = 'block';
      notify.style.background = 'hotpink';
      notify.innerHTML = 'Please fill all fields correctly';
      setTimeout(() => {
        notify.style.display = 'none';
      }, 2000);
    });
}

document.getElementById('signup').addEventListener('submit', signup);
