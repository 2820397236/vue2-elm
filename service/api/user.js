const users = require('../service/users');
const nexmo = require('../index').nexmo;
const knex = require('../knex').knex;

exports.createOrder = async (req, res) => {
  const phone = req.body.phone;
  const planId = req.body.planId;
  const qty = req.body.qty;
  const user = await knex("users").where("phone",phone).then(s=>s[0]);
  const plan = await knex("plan").where("id",planId).then(s=>s[0]);

  await knex("order").insert({
    "orderId":"1xxxx",
    "userId": user.id,
    "title":"资金池股权计划",
    "planId":plan.id,
    "price": plan.price * qty,
    "status": "WAIT",
    "createTime": Date.now()
  });

  res.status(202).send({"status":0});

}

exports.sendCode = async (req, res) => {
  const phone = req.body.phone;
  const from = '紫金池';
  const to = '86' + phone;
  let requestId='';
  
  
  const exist = await knex('verify').where("phone",phone).andWhere("expireTime",">", Date.now() + 5*60*1000).then(s => s[0]);
  if(exist) {
    res.status(202).send({"error":"exist"});
    return;
  }else{
    const text = '【零卡科技】尊敬的用户，您的验证码是：4520，该验证码3分钟内有效，请妥善保管。';
    // nexmo.message.sendSms({from, to, text, async (err, result) => {
    nexmo.verify.request({number: to, brand: from}, async (err, result) => {
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
}

exports.verify = async (req, res) => {

  const phone = req.body.phone;
  const code = req.body.code;
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
            }).where("photo",phone);

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
  // users.verify(phone);

  // users.add(phone).then(success => {
    
  //   res.send(success);
  // }).catch(err => {
  //   console.log(err);
  //   res.status(403).end();
  // });
};
