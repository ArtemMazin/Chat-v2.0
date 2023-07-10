const BASE_URL = 'http://localhost:5000';

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

async function request(url, options) {
  const res = await fetch(`${BASE_URL}${url}`, options);
  return getResponseData(res);
}

export function login(email, password) {
  return request('/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    if (data) {
      localStorage.setItem('token', 'isLoggedIn');
      return data;
    }
  });
}
export function register(name, email, password) {
  return request('/signup', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
}
export function getUsers() {
  return request('/users', { credentials: 'include' });
}
export function getProfileData() {
  return request('/users/me', { credentials: 'include' });
}

export function logout() {
  return request('/signout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}

export function changeProfileData(data) {

  return request('/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: data.avatar,
      name: data.name,
      about: data.about,
    }),
    credentials: 'include',
  });
}
