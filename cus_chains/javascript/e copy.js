var d= new Date();
var time = d.getTime();
var timeRange = 1 * 86400000; // one day
var exp = time+timeRange;
var token = {
    userId: 'trang01',
    iss: time,
    exp: exp,
}
console.log(token);
var date1 = new Date(time); 
var date2 = new Date(exp); 
console.log(date1.toString());
console.log(date2.toString());
 

// const cryptico = require('cryptico');
// var rsakey = cryptico.generateRSAKey('org1', 1024);
// var pbK = cryptico.publicKeyString(rsakey);
// //console.log(pbK);
// var keyid = cryptico.publicKeyID(pbK);
// //console.log(keyid);
// var plaintext = JSON.stringify(token);
// var enText = cryptico.encrypt(plaintext, pbK, rsakey)
// //console.log(enText);
// var ciphertext = enText.cipher;
// var deText = cryptico.decrypt(ciphertext, rsakey);
// //console.log(deText); 


// const {RSAKey} = require('cryptico'); 
// console.log(JSON.stringify(rsakey));



// const NodeRSA = require('node-rsa');
// const key = new NodeRSA({b: 1024});
 
// const text = 'Hello RSA!';

// //var pbkeyStr = key.exportKey('pkcs8-public-pem');
// //var pvkeyStr = key.exportKey('pkcs8-private-pem');
// //console.log(pbkeyStr);
// //console.log(pvkeyStr);
// var fs = require('fs');
// //fs.writeFile('private.pem', pvkeyStr);
// //fs.writeFile('public.pem', pbkeyStr);
// var pvkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/user/private.pem','utf8');
// var pbkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/user/public.pem','utf8');

// // console.log(pbkeyStr);
// // console.log(pvkeyStr);
 


// const publicKey = new NodeRSA();
// publicKey.importKey(pbkeyStr, 'pkcs8-public-pem');
// const encrypted = publicKey.encrypt(text, 'base64');
// console.log('encrypted: ', encrypted);

// const privateKey = new NodeRSA();
// privateKey.importKey(pvkeyStr, 'pkcs8-private-pem');
// const decrypted = privateKey.decrypt(encrypted, 'utf8');
// console.log('decrypted: ', decrypted);

// var signText = 'hello sign';
// var signed = privateKey.sign(signText, 'base64', 'base64');
// console.log('signed: ', signed);
// var verified = publicKey.verify(signText, signed.toString(), 'base64', 'base64');
// console.log('verified: ', verified);

