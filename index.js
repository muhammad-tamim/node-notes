const { URL } = require('url');

const apiUrl = new URL('https://api.example.com/search');

apiUrl.searchParams.append('q', 'node js tutorial');
apiUrl.searchParams.append('page', '1');
apiUrl.searchParams.append('limit', '10');

console.log(apiUrl.href); // https://api.example.com/search?q=node+js+tutorial&page=1&limit=10
