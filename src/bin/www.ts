import app from "../app";
import https from "https";
import http from "http";
import fs from "fs";

class Www {
  constructor() {
    const PORT = process.env.PORT;
    const SSL_PORT = process.env.SSL_PORT;
    if (process.env.SSL_STATUS) {
      const credentials = {
        key: fs.readFileSync(`${__dirname}/ssl/${process.env.SSL_KEY}`),
        cert: fs.readFileSync(`${__dirname}/ssl/${process.env.SSL_CERT}`),
      };
      const httpsServer = https.createServer(credentials, app);
      httpsServer.listen(SSL_PORT, () => {
        console.log(`Server ON ${SSL_PORT} `);
      });
    } else {
      const httpServer = http.createServer(app);
      httpServer.listen(PORT, () => {
        console.log(`Server ON ${PORT} `);
      });
    }
  }
}

new Www();
