//var res = "{{response}}";
//console.log(res); 
var priKey = $.cookie("privateKey"); 
if (priKey) {
  if (res !== 'user not found') {
    res = res.replace(/&quot;/g, '"');
    res = res.replace(/&#x3D;/g, '=');

    res = JSON.parse(res);
    var privateKey = forge.pki.privateKeyFromPem(priKey);
    
    var encryptedData = res.data;
    var resdata = '';
    encryptedData.forEach(encrypted => { 
      var encryptedBuffer = forge.util.decode64(encrypted);;
      var decrypted = privateKey.decrypt(encryptedBuffer); 
      resdata = resdata.concat(decrypted);
    });
    resdata = JSON.parse(resdata);
    //console.log(resdata);
    var serverPbKey = forge.pki.publicKeyFromPem(resdata.key);
    var serverMess = resdata.data;
    var userInfo = $('#userId').val();
    console.log(userInfo);
    var requestInfo = {
      userinfo : userInfo,
      data: serverMess,
    }
    var requestString = JSON.stringify(requestInfo);
    var requestArr = requestString.match(/.{1,100}/g);
    //console.log(requestArr);
    var encryptedData = [];
    requestArr.forEach(line => {
      var encrypted = serverPbKey.encrypt(line);
      var encrypted64 = forge.util.encode64(encrypted);
      encryptedData.push(encrypted64.toString());  
    });
    //console.log(encryptedData);
    post('/token/auth', { info: JSON.stringify(encryptedData) });

  }
  else {
    post('token/auth', { info: 'false' });
  }
}
else {
  alert('privateKey not found');
}
 

function Decrypt(tx){
    return {text: 'random text', pubKey:'pbKey'};
}
function Encrypt(userId, randomtext, pubKey){
    return 'encrypted';
}

function post(path, params, method='post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
  
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];
  
        form.appendChild(hiddenField);
      }
    }
  
    document.body.appendChild(form);
    form.submit();
}
 
function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

function stringToUint(string) {
  var string = btoa(unescape(encodeURIComponent(string))),
      charList = string.split(''),
      uintArray = [];
  for (var i = 0; i < charList.length; i++) {
      uintArray.push(charList[i].charCodeAt(0));
  }
  return new Uint8Array(uintArray);
}

function uintToString(uintArray) {
  var encodedString = String.fromCharCode.apply(null, uintArray),
      decodedString = decodeURIComponent(escape(atob(encodedString)));
  return decodedString;
}
