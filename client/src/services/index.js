export async function submitPost(submission) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: submission }),
  };

  let response = {};

  fetch('/submit', options)
    .then((res) => res.json())
    .then((data) => {
      response = data;
    });

  return response;
}
