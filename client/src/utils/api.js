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

export function login(userName, userPassword) {
  return request('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, userPassword }),
  }).then((data) => {
    return data;
  });
}
