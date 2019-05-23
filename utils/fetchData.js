export const fetchData = url => {
  return fetch(url)
    .then(response => response.json())
    .catch(error => error.message);
};
