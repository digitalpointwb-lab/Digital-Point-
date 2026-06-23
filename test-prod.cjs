// test production server on port 3001
const cp = require('child_process');
const server = cp.spawn('node', ['dist/server.cjs'], {
  env: { ...process.env, PORT: '3001', NODE_ENV: 'production' }
});
server.stdout.on('data', d => console.log(d.toString()));
server.stderr.on('data', d => console.error(d.toString()));
server.on('close', code => console.log('exited with code ' + code));
setTimeout(() => {
  server.kill();
}, 5000);
