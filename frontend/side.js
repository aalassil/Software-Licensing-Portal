const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/saveCredentials') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            fs.writeFile('clients&providers.txt', `Username: ${username}, Password: ${password}\n`, { flag: 'a' }, err => {
                if (err) {
                    console.error(err);
                    res.writeHead(500);
                    res.end('Error writing to file');
                    return;
                }
                res.writeHead(200);
                res.end('Credentials saved successfully');
            });
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
