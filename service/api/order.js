const nexmo = require('../index').nexmo;
const knex = require('../knex').knex;

//USER
exports.getAllOrderList = async(req, res) => {
  
  const phone = req.body.phone;
  const user = await knex("users").where("phone",phone).then(s=>s[0]);
  if(!user)  res.status(202).send({"error":"user not exist"});

  const withdraw = await knex("order").where({"type":"CASH_WITHDRAW"}).orderBy("createTime","desc");
  // const deposit = await knex("order").where({"type":"CASH_DEPOSIT"});
  const resting = await knex("order").where({"type":"ORDER_RESTING"}).orderBy("createTime","desc");
  res.status(200).send({"status":0,"data":{ "withdraw": withdraw , "resting" : resting }});
};

protectUserPhone = (tel)=>{
  return tel.substr(0, 3) + '****' + tel.substr(7);
}
//创建挂单
exports.createRestingOrder = async(req, res) => {
  
  const phone = req.body.phone;
  const user = await knex("users").where("phone",phone).then(s=>s[0]);
  if(!user)  res.status(202).send({"error":"user not exist"});

  const value = req.body.value;
  const withdraw = await knex("order").insert({
    "orderId":Math.random().toString(36).substring(2),
    "userId": user.id,
    "title": "["+ protectUserPhone(user.phone) + "] 挂单 " +value +"手",
    "price": value,
    "status": "WAIT",
    "type":"ORDER_RESTING",
    "createTime": Date.now()
  });
  res.status(200).send({"status":0});
};

//创建提现单
exports.createWithdrawOrder = async(req, res) => {
  
  const phone = req.body.phone;
  const user = await knex("users").where("phone",phone).then(s=>s[0]);
  if(!user)  res.status(202).send({"error":"user not exist"});

  const value = req.body.value;
  const withdraw = await knex("order").insert({
    "orderId":Math.random().toString(36).substring(2),
    "userId": user.id,
    "title": "["+ protectUserPhone(user.phone) + "] 提现 " + value + "元",
    "price": value,
    "status": "WAIT",
    "type":"CASH_WITHDRAW",
    "createTime": Date.now()
  });
  res.status(200).send({"status":0});
};

exports.createOrder = async (req, res) => {
  const phone = req.body.phone;
  const planId = req.body.planId;
  const qty = req.body.qty;
  const user = await knex("users").where("phone",phone).then(s=>s[0]);
  if(!user)  res.status(202).send({"error":"user not exist"});
  const plan = await knex("plan").where("id",planId).then(s=>s[0]);
  if(!plan)  res.status(202).send({"error":"plan not exist"});

  await knex("order").insert({
    "orderId":Math.random().toString(36).substring(2),
    "userId": user.id,
    "title":"资金池股权计划",
    "planId":plan.id,
    "price": plan.price * qty,
    "status": "WAIT",
    "type":"CASH_DEPOSIT",
    "createTime": Date.now()
  });

  res.status(200).send({"status":0});
};

exports.setOrderSuccess = async(req, res) => {
  
  const phone = req.body.phone;
  const orderId = req.body.orderId;

  const user = await knex("users").where("phone",phone).then(s=>s[0]);
  if(!user)  res.status(202).send({"error":"user not exist"});

  const order = await knex("order").update({"status":"SUCCESS"}).where("id",orderId);
  res.status(200).send({"status":0});
};

//ADMIN
exports.getUserOrder = async (req, res) =>{
  const phone = req.body.phone;
  const user = await knex("users").where({"phone":phone,"type":"ADMIN"}).then(s=>s[0]);
  if(!user)  res.status(202).send({"status":-9,"error":"user not admin"});
  
  const userList = await knex("order").select("order.id","users.cName","users.phone","order.orderId","order.price","order.status","order.type","order.createTime")
  .leftJoin('users', 'order.userId','users.id').orderBy('order.createTime', 'desc');

  res.status(200).send(userList);
}


exports.setOrderSuccess = async (req, res) =>{
  const phone = req.body.phone;
  const orderId = req.body.orderId;
  const user = await knex("users").where({"phone":phone,"type":"ADMIN"}).then(s=>s[0]);
  if(!user)  res.status(202).send({"status":-9,"error":"user not admin"});
  
  const order  = await knex("order").select().where({"id":orderId}).then(s=>s[0]);
  if(!order) res.status(202).send({"status":-9,"error":"order not exist"});
 
  await knex("order").update({"status":"SUCCESS"}).where({"id":orderId});
  await knex("order").where({"status":"WAIT","userId":order.userId}).del();
  await knex("users").update({"money":order.price}).where({"id":order.userId});
  await knex("cashflow").insert({
    "outID":order.orderId,
    "userId":order.userId,
    "value":order.price,
    "type":"CASH",
    "status":"IN",
    "createTime":Date.now()
  });
  res.status(200).send({"status":0});
}

