const fs = require('node:fs') 
const path = require('node:path')

key = path.resolve(__dirname,'private-server-key.pem' )
cert = path.resolve(__dirname,'public-server-cert.pem' )

const options = {
  key: fs.readFileSync(key), 
  cert: fs.readFileSync(cert),
  rejectUnauthorized: false
}


module.exports = options