const users = require('../service/users');
const nexmo = require('../index').nexmo;
const knex = require('../knex').knex;

//USER
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

exports.sendCode = async (req, res) => {
  const phone = req.body.phone;
  const from = 'NEXMO';
  const to = '86' + phone;
  let requestId='';
  
  const exist = await knex('verify').where("phone",phone).andWhere("expireTime",">", Date.now() + 5*60*1000).then(s => s[0]);
  if(exist) {
    res.status(202).send({"error":"exist"});
    return;
  }else{
    // const text = '【霖咖科技】尊敬的用户，您的验证码是：4520，该验证码3分钟内有效，请妥善保管。';
    // nexmo.message.sendSms(from, to, text, (error, response) => {
    //   if(error) {
    //     // res.status(401).send({"status":-1,"error":response.error_text});
    //     throw error;
    //   } else if(response.messages[0].status != '0') {
    //     console.error(response);
    //     // res.status(401).send({"status":-1,"error":response.error_text});
    //     throw 'Nexmo returned back a non-zero status';
    //   } else {
    //     console.log(response);
    //     res.send(response);
    //   }
    // });
    const brand = '资金池';
    nexmo.verify.request({number: to, brand: brand}, async (err, result) => {
      if(err) {
        res.sendStatus(500);
      } else {
        requestId = result.request_id;
        if(result.status == '0') {
          await knex('verify').insert({
            "phone":phone,
            "requestId":requestId,
            "expireTime": Date.now() + 5*60*1000,
          });
          res.send(result);
        } else {
          res.status(401).send({"status":-1,"error":result.error_text});
        }
      }
    });
  }
};

exports.login = async (req, res) =>{
  const account = req.body.account;
  const phone = account.phone;
  const password = account.password;
  const user = await knex('users').select().where({phone,password}).then(s=>s[0]);
  console.log(user);
  if(user){
    res.status(200).send({"status":0,"data":{"phone":user.phone,"cName":user.cName}});
  }else{
    res.status(200).send({"status":-1});
  }
}

exports.verify = async (req, res) => {

  const phone = req.body.phone;
  const code = req.body.code;
  const password = req.body.password;
  const codeRow = await knex('verify')
    .where("expireTime",">", Date.now())
    .orderBy('expireTime', 'desc')
    .then(s => s[0]);
  if(codeRow){
    const requestId = codeRow.requestId;
    console.log({expireTime: codeRow.expireTime, now: Date.now()});
    console.log({request_id: requestId, code: code});
    nexmo.verify.check({request_id: requestId, code: code}, async (err, result) => {
      console.log(result);
      if(err) {
        res.sendStatus(500).send({"status":-2});
      } else {
        if(result && result.status == '0') { // Success!
          await knex('verify').update({
            "verify":code
          }).where("requestId",requestId);

          const user = await knex('users').where("phone",phone).then(s=>s[0]);
          if(user){

            await knex('users').update({
              "verify":code,
              "requestId":requestId,
              "loginTime":Date.now()
            }).where("phone",phone);

          }else{
            await knex('users').insert({
              "phone":phone,
              "username":phone,
              "verify":code,
              "requestId":requestId,
              "createTime":Date.now(),
              "loginTime":Date.now()
            });
          }

          res.status(200).send({"status":0});
        } else {
          res.status(401).send({"status":-2,"error":result.error_text});
        }
      }
    });
  }else{
    res.status(401).send({"status":-1,"error":"验证码已过期"});
  }
};

exports.verify2 = async (req, res) => {
  const account = req.body.account;
  const phone = account.phone;
  const code = account.verify;
  const cName = account.cName;
  const password = account.password;
  const invite = account.inviteCode;

  const codeRow = await knex('verify')
    .where("expireTime",">", Date.now())
    .orderBy('expireTime', 'desc')
    .then(s => s[0]);

  if(codeRow){

    const requestId = codeRow.requestId;
    nexmo.verify.check({request_id: requestId, code: code}, async (err, result) => {
      console.log(cName);
      if(err) {
        res.sendStatus(500).send({"status":-2,"error":result.error_text});
      } else {
        if(result && result.status == '0') { // Success!
          await knex('verify').update({
            "verify":code
          }).where("requestId",requestId);

          const user = await knex('users').where("phone",phone).then(s=>s[0]);
          if(user){

            await knex('users').update({
              "verify":code,
              "requestId":requestId,
              "cName":cName,
              "password":password,
              "invite":invite,
              "loginTime":Date.now()
            }).where("phone",phone);

          }else{
            await knex('users').insert({
              "phone":phone,
              "username":phone,
              "verify":code,
              "requestId":requestId,
              "cName":cName,
              "password":password,
              "invite":invite,
              "inviteKey":Math.random().toString(36).substr(2).slice(2,8),
              "createTime":Date.now(),
              "loginTime":Date.now()
            });
          }

          res.status(200).send({"status":0});
        } else {
          res.status(401).send({"status":-2,"error":result.error_text});
        }
      }
    });
  }else{
    res.status(401).send({"status":-1,"error":"验证码已过期"});
  }
};

exports.getUserFinance = async (req, res) => {
  const phone = req.body.phone;
  const user = await knex("users").where({"phone":phone}).then(s=>s[0]);
  if(!user)  res.status(202).send({"error":"user not exsit"});

  const cashflow = await knex('cashflow')
              .select(knex.raw('sum(value) as money, userId, createTime'))
              .where({"userId":user.id})
              .groupBy('userId')
              .then(s=>s[0]);
  let cashflowMoney = 0;
  if(cashflow){
    cashflowMoney = cashflow.money;
  }

   res.status(200).send({
    "status":0,
    "data":{
      "cName":user.cName,
      "invite":user.invite,
      "inviteKey":user.inviteKey,
      "totalMoney":cashflowMoney,
      "createTime":cashflow.createTime
    }
  });
};


exports.getPlanList = async (req, res) => {
  const phone = req.body.phone;
  const user = await knex("users").where({"phone":phone}).then(s=>s[0]);
  if(!user)  res.status(200).send({"status":-9,"error":"user not exsit"});


  const plan  = await knex("plan").select();
  if(!plan) res.status(200).send({"status":-9,"error":"no plan"});
  res.status(200).send({"status":0,"data":plan});
};

exports.getUserPlan = async (req, res) => {
  const phone = req.body.phone;
  const user = await knex("users").where({"phone":phone}).then(s=>s[0]);
  if(!user)  res.status(200).send({"status":-9,"error":"user not exsit"});

  const outId = req.body.outId;
  const order  = await knex("order").select().where({"userId":user.id,"status":"SUCCESS"}).orderBy("createTime","desc").then(s=>s[0]);
  if(!order) {
    res.status(200).send({"status":-9,"error":"order not exist"});
  }else{
    const planId = order.planId;
    const plan  = await knex("plan").select().where({"id":planId}).then(s=>s[0]);
    if(!plan) res.status(200).send({"status":-9,"error":"plan not exist"});
    res.status(200).send(plan);
  }
};

exports.getUserTeam = async(req, res) =>{
  const phone = req.body.phone;
  const user = await knex("users").where({"phone":phone}).then(s=>s[0]);
  if(!user)  res.status(200).send({"status":-9,"error":"user not exsit"});

  
  let inviteKeyMap = {};
  let inviteKeyList = [];
  
  //根据邀请码转map
  const all  = await knex("users").select().map(o=>{
    if(false  == inviteKeyMap[o.invite] instanceof Array){
      inviteKeyMap[o.invite] = [];
    }

    inviteKeyMap[o.invite].push(getUserObject(o));
    return getUserObject(o);
  });


  //1级邀请
  const team  = await knex("users").select().where({"invite":user.inviteKey}).orderBy("createTime","desc").map(o=>{
    inviteKeyList.push(o.inviteKey);
    return getUserObject(o);
  });
  if(!team) res.status(200).send({"status":-9,"error":"team has not member"});


  const result = team.map(o=>{

    o.child = inviteKeyMap[o.inviteKey];
    
    if(o.child && o.child.length > 0){

      o.child.map(p=>{
        p.child = inviteKeyMap[p.inviteKey];
      });
    }
    return o;
  });

  res.status(200).send(result);
}

getUserObject = (o)=>{
  return {
      "cName":o.cName,
      "invite":o.invite,
      "inviteKey":o.inviteKey,
      "phone":o.phone,
      "money":o.money,
      "createTime":o.createTime
    }
}



//ADMIN

exports.getUserList = async (req, res) =>{
  const phone = req.body.phone;
  const user = await knex("users").where({"phone":phone,"type":"ADMIN"}).then(s=>s[0]);
  if(!user)  res.status(202).send({"status":-9,"error":"user not admin"});
  
  let userList = await knex("users").select("id","cName","phone","type","invite","inviteKey","createTime").orderBy('createTime', 'desc');;
  res.status(200).send(userList);
}

exports.getUserOrder = async (req, res) =>{
  const phone = req.body.phone;
  const user = await knex("users").where({"phone":phone,"type":"ADMIN"}).then(s=>s[0]);
  if(!user)  res.status(202).send({"status":-9,"error":"user not admin"});
  
  const userList = await knex("order").select("order.id","users.cName","users.phone","order.orderId","order.price","order.status","order.type","order.createTime")
  .leftJoin('users', 'order.userId','users.id').orderBy('order.createTime', 'desc');

  res.status(200).send(userList);
}

exports.getUserFlow = async (req, res) =>{
  const phone = req.body.phone;
  const user = await knex("users").where({"phone":phone,"type":"ADMIN"}).then(s=>s[0]);
  if(!user)  res.status(202).send({"status":-9,"error":"user not admin"});
  
  const cashList = await knex("cashflow").select("cashflow.id","users.cName","users.phone","cashflow.outId","cashflow.value","cashflow.status","cashflow.type","cashflow.createTime")
  .leftJoin('users', 'cashflow.userId','users.id').orderBy('cashflow.createTime', 'desc');

  res.status(200).send(cashList);
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

