const BASE_URL = 'http://localhost:5000';

function getResponseData(res, setErrorMessage) {
  if (!res.ok) {
    //получаем ответ от сервера с текстом ошибки, чтобы передать его в попап
    res.text().then((text) => {
      setErrorMessage(JSON.parse(text).message || JSON.parse(text).error);
    });
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

async function request(url, options, setErrorMessage) {
  const res = await fetch(`${BASE_URL}${url}`, options);
  return getResponseData(res, setErrorMessage);
}

export function login(email, password, setErrorMessageLogin) {
  return request(
    '/signin',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
    setErrorMessageLogin
  ).then((data) => {
    if (data) {
      localStorage.setItem('token', 'isLoggedIn');
      return data;
    }
  });
}
export function register(name, email, password, setErrorMessageLogin) {
  return request(
    '/signup',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    },
    setErrorMessageLogin
  );
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
