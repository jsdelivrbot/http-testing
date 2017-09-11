var basicAuth = require('basic-auth');

function unauthorized(res){
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.sendStatus(401);
};
module.exports = function auth(req, res, next){
  const {name, pass} = BasicAuth(req) || {};

  if(!name || !pass){
    return unauthorized(res);
  }
  if(name==='admin' && pass==='123'){
    return next();
  }
  return unauthorized(res);
};
