const knex = require('../knex').knex;
const nexmo = require('../index').nexmo;

const sendCode = async (req, res, phoneNo) => {
  const from = '紫絮家纺';
  const to = '86' + phoneNo;
  // const text = '【酷师科技】欢迎使用蜜蜂点评，您的注册验证码为：2521，该验证码30分钟内有效。若非您本人操作，可忽略本消息。';
  // nexmo.message.sendSms(from, to, text);
  let requestId='';
  const nexmSendCode = async (phoneNo) => {
    nexmo.verify.request({number: to, brand: from},(err, result) => {
      if(err) {
        res.sendStatus(500);
      } else {
        requestId = result.request_id;
        if(result.status == '0') {
          res.render('verify', {requestId: requestId}); // Success! Now, have your user enter the PIN
          //  knex('verify').insert({
          //   "requestId":requestId,
          //   "phone":phoneNo,
          //   "expireTime": Date.now() + 5*3600,
          // });
        } else {
          res.status(401).send(result.error_text);
        }
      }
    });
  }

  const send = await nexmSendCode(phoneNo);
}


const verify = async phoneNo => {

 
  
};

const add = async phoneNo => {

  const addUserByPhone = async (phoneNo) => {
    const users = await knex('users').where({ 'phone': phoneNo }).then(s => s[0]);
    if(users) { return; }
    await knex('users').insert({
      'phone': phoneNo,
      'username': phoneNo,
      'createTime': Date.now(),
      'loginTime': Date.now(),
    });
  };
  await addUserByPhone(phoneNo);
  return;
};


exports.add = add;
exports.verify = verify;
exports.sendCode = sendCode;