fetch('http://localhost:3115/customer', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
  .then(d => console.log(d))

console.log('működik');