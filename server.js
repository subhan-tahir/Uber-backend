const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
console.log('api key',process.env.GOOGLE_MAP_API)
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


