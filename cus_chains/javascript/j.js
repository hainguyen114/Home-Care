var forge = require('node-forge');
var fs = require('fs'); 
var pvkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/user/private.pem','utf8');
var pbkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/user/public.pem','utf8');
var pki = forge.pki;
//var nwRsa = rsa.setPublicKey(JSON.parse(nHere), JSON.parse(eHere));
var publicKey = pki.publicKeyFromPem(pbkeyStr);
var privateKey = pki.privateKeyFromPem(pvkeyStr);
// console.log(publicKey);
// console.log(privateKey);
var text = '';
var encrypted = publicKey.encrypt(text);
var encrypted64 = forge.util.encode64(encrypted);

var encryptedBuffer =forge.util.decode64(encrypted64);; 
var decrypted = privateKey.decrypt(encryptedBuffer);
console.log(decrypted);


