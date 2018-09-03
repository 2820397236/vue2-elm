const app = require('./index').app;
const users = require('./api/user');



app.post('/api/v1/sendCode', users.sendCode);
app.post('/api/v1/verify', users.verify);
app.post('/api/v1/createOrder', users.createOrder);
app.post('/api/v1/getUserFinance', users.getUserFinance);

app.get('*', (req, res) => {
  res.redirect('/');
});

app.post('/auth/:id/:password', function(req, res) {
    res.send({id:req.params.id, name: req.params.password});
});

// wss.on('connection', function connection(ws) {
//   // console.log(ws);
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });
//   ws.send('ws connected');
// });

