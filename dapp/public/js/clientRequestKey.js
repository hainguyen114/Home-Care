

var priKey = $.cookie("privateKey");
if (priKey) {
  if (tokenInfo !== 'tokenInfo not found') {
    tokenInfo = tokenInfo.replace(/&quot;/g, '"');
    tokenInfo = tokenInfo.replace(/&#x3D;/g, '=');
    tokenInfo = tokenInfo.slice(1, -1);
    tokenInfo = JSON.parse(tokenInfo);
    var privateKey = forge.pki.privateKeyFromPem(priKey);
    var encryptedData = tokenInfo.data;
    var resdata = '';
    encryptedData.forEach(encrypted => {
      var encryptedBuffer = forge.util.decode64(encrypted);;
      var decrypted = privateKey.decrypt(encryptedBuffer);
      resdata = resdata.concat(decrypted);
    });
    resdata = JSON.parse(JSON.parse(resdata));
    console.log(resdata);

    //console.log(resdata);
    var serverPbKey = forge.pki.publicKeyFromPem($('#ksPbKey').val()); 
    var userInfo = $('#userId').val(); 
    var requestInfo = resdata;
    var requestString = JSON.stringify(requestInfo);
    var requestArr = requestString.match(/.{1,100}/g);
    //console.log(requestArr);
    var encryptedData = [];
    requestArr.forEach(line => {
      var encrypted = serverPbKey.encrypt(line);
      var encrypted64 = forge.util.encode64(encrypted);
      encryptedData.push(encrypted64.toString());  
    }); 

    post('/key', { info: JSON.stringify(encryptedData) });
  }
}
else {
  alert('privateKey not found');
}
//post('/key',tokenInfo);



function post(path, params, method = 'post') {

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
