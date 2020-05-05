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
// // const key = new NodeRSA({b: 1024});
 
// // const text = 'Hello RSA!';

// // var pbkeyStr = key.exportKey('pkcs8-public-pem');
// // var pvkeyStr = key.exportKey('pkcs8-private-pem');
// // console.log(pbkeyStr);
// // console.log(pvkeyStr);
// var fs = require('fs');
// //fs.writeFile('/home/thanhtrang/Documents/0scripts/key/pk8/private.pem', pvkeyStr);
// //fs.writeFile('/home/thanhtrang/Documents/0scripts/key/pk8/public.pem', pbkeyStr);

// // fs.writeFile('/home/thanhtrang/Documents/0scripts/key/user/private.pem', pvkeyStr);
// // fs.writeFile('/home/thanhtrang/Documents/0scripts/key/user/public.pem', pbkeyStr);
// // fs.writeFile('/home/thanhtrang/Documents/0scripts/key/org/private.pem', pvkeyStr);
// // fs.writeFile('/home/thanhtrang/Documents/0scripts/key/org/public.pem', pbkeyStr);
// // fs.writeFile('/home/thanhtrang/Documents/0scripts/key/key/private.pem', pvkeyStr);
// // fs.writeFile('/home/thanhtrang/Documents/0scripts/key/key/public.pem', pbkeyStr);
// // var pvkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/user/private.pem','utf8');
// // var pbkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/user/public.pem','utf8');

// // // console.log(pbkeyStr);
// // // console.log(pvkeyStr);
 


// // // const publicKey = new NodeRSA();
// // // publicKey.importKey(pbkeyStr, 'pkcs8-public-pem');
// // // const encrypted = publicKey.encrypt(text, 'base64');
// // // console.log('encrypted: ', encrypted);

// // // const privateKey = new NodeRSA();
// // // privateKey.importKey(pvkeyStr, 'pkcs8-private-pem');
// // // const decrypted = privateKey.decrypt(encrypted, 'utf8');
// // // console.log('decrypted: ', decrypted);

// // // var signText = 'hello sign';
// // // var signed = privateKey.sign(signText, 'base64', 'base64');
// // // console.log('signed: ', signed);
// // // var verified = publicKey.verify(signText, signed.toString(), 'base64', 'base64');
// // // console.log('verified: ', verified);

// // var data = 'HNg2ENR/OnbepTHcDadz7O+9pw5fRlX5TKzyJ4oCL6U5fW1tRLyGvrJYWNs4pzK33YzJJaYVDWPmau4rwLimLOEUm6OOQuFrLUWGYzhnfqj2o1oo07wtb1e/hKzrkhpO3Wo0hlbPNF2tmb4UWnPkTl2b321P+R2D56XfKkhWuxRDEfJ1aATaz2oZq3zzOR23PDi4YHmOzfRXvSae8JCVV/VA4+rg3/ZGBtc/rr3dQwaN2a0RR8zk3l31PYQcjh9Z3+kNnnje59CS8zgnv8Q3Iu9MZrYhPpFlDVVKfYz4St/f8MVAWvBAsZr6Lxq8gEMBEol/xIf4dAEH1j0hNXlj1UjWiiziKngkPP4eUT88+C5TvuuqxpiATaBVpPQAelZkS7oVTdTb1IuyeGNUIYbjUwBM9IUgd42GwSKI4qHGysLYj9MDbhMoAuD0py7Ax8eL6j/A/qVyPvZ46h2oLhsfnMrzdJlcB9dmDvl6p9nD0Btn7KeoawdSS3EPOnJrpjXpFgAan+5+PANG0MFpnP/wuT+mW2lpodZtS09wIfazVEbipIfTAUFsg9Whd/SnZ3jMWIMP/8YZTvm8RUoH6r342SfYWJBuyrrqnZ6TFBP8XMuijj23ze3eTcowSvcPYyUzCY1IpGt5Vs8uVSmZINqeQCiCdNM+YSjbKA3vUu7UiE4=';
// // const privateKey = new NodeRSA();
// // privateKey.importKey(pvkeyStr, 'pkcs8-private-pem');
// // const decrypted = privateKey.decrypt(data, 'utf8');
// // console.log('decrypted: ', decrypted);
// // console.log(privateKey);
// var data = 'LzWxRJuP1EOuiQb92J5kkMwMLSseVjwCRvj+83/O8TnDuttE3YH1pIHoIHYcHGvOvUGuFE4lJ0+2fxRFTScMT/9KxqiBuVYMJzrRKN0b6n+NMmb4BdVH2ALvRhDEvRp1fTgLgAX/yz8yh+g/EQQROn5tcy5jXg9h6WSwTGiocBYTy3dUF+S+JNiO8HQwEaL0qIyI+uwYf0chmQPGAitJgJlGd473e+tPCZKeD0LBsc1sPgJrvsHDMJUXne4+jIIwUTXHd5IS+641Q5fT/QrEZo48qvCC8oJUipbK5oY4xH18QJHYQGQp19AeMwBMGSTfkO/ea3SZlJP3xt80CPiwuR2dIjX/wdo5EBcscnwMKBrXS8qm+r3qe5dvD+B2QwfgrqYN514ZZ6q50UlTjIT+fgBSgxrw48n0hwq2xacW30mf/mZfSPvfFEkCka30/nZRkAyrzZd8XJEC81cvjr7RNGTFzIbRyKdb0//xFIOG8zPhSi6BArq9RS9mFFl6MG8rYr0MFeQ1qyp2eQR+xo+zb6ZeOhsueK43oJWDfb4bJXP9cb9ew28y+a+M34iJhJ27uPQunJLz2+aw6LbYHTFRq8FuTg6YVMa9IjtaE0iFNlRUIWTrSNhJptJfn9GfzuceG46k7BzeocUW4rSXFL3u4nJD+ezCoWbBV77bJHn7LrY=';
// const privateKey = new NodeRSA();
// var pvkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/user/private.pem','utf8');
// privateKey.importKey(pvkeyStr, 'pkcs8-private-pem');
// const decrypted = privateKey.decrypt(data, 'utf8');
// console.log('decrypted: ', decrypted);
