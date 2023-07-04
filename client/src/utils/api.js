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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    return data;
  });
}
export function register(email, password) { 
  return request('/signup', 
    { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ email, password }), 
    },
  );
} 
