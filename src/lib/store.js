/* store.js */
let fs     = require('fs'),
  uuid   = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)),
  /* may be made asynchronous */
  rm     = id=>fs.unlinkSync(path.join(dir, id)),
  dir    = '/tmp/',
  path   = require('path');

/*writes/reads data as text/plain, open to modifications*/
module.exports = {
  read: id =>new Promise((resolve, reject)=>fs.readFile(path.join(dir, id), (err, buffer)=>{
      if(err) reject(err);
      else resolve(buffer.toString())
    })
  ),
  write: function(data, cb, id) {
    fs.writeFile(path.join(dir, (id=uuid())), data, _=>cb(id))
  },
  rm
}
