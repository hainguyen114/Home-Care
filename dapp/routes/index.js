var express = require('express');
var router = express.Router();


const FabricCAServices = require('fabric-ca-client');
const { Gateway, Wallets } = require('fabric-network');
const querystring = require('querystring');    
const path = require('path');
var fs = require('fs');

var Cart = require('../models/cart'); 

var Token =  require('../models/token');  
var token =  new Token();

router.get('/', function (req, res, next) {
  res.render('index', 
  { 
    title: 'NodeJS Hyperledger fabric', 
  }
  );
}); 

router.get('/token', async function (req, res, next) {
  const allTokens = await token.getAllTokens(); 
  res.render('token', 
    { 
      title: 'token viewer', 
      tokenArr: allTokens,
      token: req.query.data
    }); 
});


router.post('/token', async function (req, res, next) {
  //const allTokens = await token.getAllTokens();
  //const checkAuth = await token.checkAuth(req.body.userId,req.body.tokenInfo); 
  var checkAuth = await token.checkAuth(req.body.userId); 
  var result = !checkAuth ? 'user not found' : checkAuth;  
  res.render('token', 
    { 
      title: 'token viewer', 
      //tokenArr: allTokens,
      response: result
    }); 
});

router.post('/token/auth', async function (req, res, next) {  
  var resdata = 'err: user not found'; 
  if(req.body.info != 'false') {
    // decrypt
    // check mess/
    // createtoken
    var data = req.body.info;  
    resdata = await token.requestToken(data);
    resdata = JSON.stringify(resdata);
  }
  var response = querystring.stringify({ 
    "data": resdata,
  });
  res.redirect('/token/?' + response); 
});

router.post('/key', async function (req, res, next) {    
  console.log(req.body.info);
  var check = await token.checkToken(req.body.info);
  res.render('token', 
  { 
    title: 'key viewer',
    key: check
  }); 
});

module.exports = router;
