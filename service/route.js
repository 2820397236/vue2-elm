const app = require('./index').app;
const users = require('./api/user');
const orders = require('./api/order');

app.post('/api/v1/sendCode', users.sendCode);
app.post('/api/v1/verify', users.verify);
app.post('/api/v2/verify', users.verify2);
app.post('/api/v1/login', users.login);
app.post('/api/v1/createOrder', users.createOrder);
app.post('/api/v1/createWithdrawOrder', orders.createWithdrawOrder);
app.post('/api/v1/createRestingOrder', orders.createRestingOrder);
app.post('/api/v1/getAllOrderList', orders.getAllOrderList);

app.post('/api/v1/getUserFinance', users.getUserFinance);
app.post('/api/v1/getUserPlan', users.getUserPlan);
app.post('/api/v1/getPlanList', users.getPlanList);
app.post('/api/v1/getUserTeam', users.getUserTeam);

app.post('/api/v2/getUserList', users.getUserList);
app.post('/api/v2/getUserOrder', users.getUserOrder);
app.post('/api/v2/getUserFlow', users.getUserFlow);
app.post('/api/v2/setOrderSuccess', users.setOrderSuccess);

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

