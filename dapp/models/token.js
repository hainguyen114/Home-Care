const FabricCAServices = require('fabric-ca-client');
const { Gateway, Wallets } = require('fabric-network');  
var forge = require('node-forge');
const path = require('path');
var fs = require('fs');
const OrgName = 'org1';
const timeRange = 1 * 86400000; // one day

var pki = forge.pki; 
const ccpPath = path.resolve(__dirname, '..', 'data', 'wallet', 'connection-org1.json');
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
const walletPath = path.join(process.cwd(), 'data', 'wallet');
const saveTextPath = path.join(process.cwd(), 'data', 'wallet','userData.txt');


var pvkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/org/private.pem','utf8');
var pbkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/org/public.pem','utf8'); 
var publicKey = pki.publicKeyFromPem(pbkeyStr);
var privateKey = pki.privateKeyFromPem(pvkeyStr);

var KEY_SERVER_pvkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/key/private.pem','utf8');
var KEY_SERVER_pbkeyStr = fs.readFileSync('/home/thanhtrang/Documents/0scripts/key/key/public.pem','utf8'); 
var KEY_SERVER_publicKey = pki.publicKeyFromPem(KEY_SERVER_pbkeyStr);
var KEY_SERVER_privateKey = pki.privateKeyFromPem(KEY_SERVER_pvkeyStr);

module.exports = function Token() {
    this.contractToken = null;
    this.contractUser = null; 
    this.getContract = async function () {
        //const ccpPath = path.resolve(__dirname, '..', 'data', 'wallet', 'connection-org1.json');
        //let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        //const walletPath = path.join(process.cwd(), 'data', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        //console.log(`Wallet path: ${walletPath}`);
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            return;
        }
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork('mychannel');
        this.contractToken = network.getContract('token');
        this.contractUser = network.getContract('user');
        return this.contractToken;
    }


    this.getAllTokens = async function () {
        try {
            if (!this.contractToken) {
                await this.getContract();
            }
            //else{ console.log('contract exist')}
            var result = await this.contractToken.evaluateTransaction('queryAllTokens');
            result = JSON.parse(result.toString());
            result = result.filter(d => d.data.org === OrgName);  
            for (var i = 0; i < result.length; i++) { 
                result[i].data.iss = new Date(result[i].data.iss); 
                result[i].data.exp = new Date(result[i].data.exp); 
              } 
            result.sort(function(a, b) { 
                if (a.data.iss > b.data.iss) return -1;
                if (a.data.iss < b.data.iss) return 1;
                return 0;
              }); 
            result = result.slice(0,20);

            return result;
            

        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return 'getAllTokens Failed';
        }
    }
    this.checkAuth = async function(userId){
        try {
            if (!this.contractUser) {
                await this.getContract();
            }
            //else{ console.log('contract exist')}
            var result = await this.contractUser.evaluateTransaction('queryUser',userId); 
            //console.log(result);
            //result = {userId: userId, result: JSON.parse(result.toString())}; 
            var info = JSON.parse(result.toString());
            var userPublicKey = info.publicKey;
            var randomText = 'text0123456789text0123456789text0123456789text0123456789text0123456789text0123456789text0123456789text0123456789text0123456789text0123456789text0123456789text0123456789text0123456789';
            var saveTextFile = fs.readFileSync(saveTextPath,'utf8');
            saveTextFile = JSON.parse(saveTextFile);
            saveTextFile[userId] = randomText;
            fs.writeFile(saveTextPath,JSON.stringify(saveTextFile));
            var returnData = {data: randomText, key: pbkeyStr};
            //console.log(userPublicKey);
            var userpbKey = pki.publicKeyFromPem(userPublicKey); 

            returnData = JSON.stringify(returnData); 
            returnData = returnData.match(/.{1,100}/g);
            var encryptedData = [];
            returnData.forEach(line => {   
                var encrypted = userpbKey.encrypt(line);
                var encrypted64 = forge.util.encode64(encrypted);
                encryptedData.push(encrypted64.toString());  
            });  
            
            return JSON.stringify({data: encryptedData}); 

        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return 'checkAuth Failed';
            //sprocess.exit(1);
        }
    }

    this.checkToken = async function(tokenInfo){
        try {
            if (!this.contractToken) {
                await this.getContract();
            } 
            tokenInfo = JSON.parse(tokenInfo); 
            var data = '';
            tokenInfo.forEach(line => {
                var encryptedBuffer = forge.util.decode64(line);;
                var decrypted = KEY_SERVER_privateKey.decrypt(encryptedBuffer); 
                data = data.concat(decrypted);
            });
            data = JSON.parse(data); 
            var tokentxid = data.txid;
            
            var result = await this.contractToken.evaluateTransaction('queryToken',tokentxid);  
            result = JSON.parse(result.toString()); 
            if(data.userid == result.userid && this.checkExpDay(result.exp)){
                return this.exportKey('some info');
            }
            return 'token has expired';
            

        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return 'checkToken Failed';
            //sprocess.exit(1);
        }
    }

    this.requestToken = async function(userInfo){ 
        try {
            if (!this.contractToken) {
                await this.getContract();
            } 
            userInfo = JSON.parse(userInfo); 
            var data = '';
            userInfo.forEach(line => {
                var encryptedBuffer = forge.util.decode64(line);;
                var decrypted = privateKey.decrypt(encryptedBuffer); 
                data = data.concat(decrypted);
            });
            data = JSON.parse(data);
            var userId = data.userinfo;
            var saveTextFile = fs.readFileSync(saveTextPath,'utf8');
            saveTextFile = JSON.parse(saveTextFile); 
            if(data.data != saveTextFile[userId]){
                return 'requestToken Failed';
            } 
            var d= new Date();
            var time = d.getTime();
            var exp = time+timeRange; 
            const token =
            {
                userid: userId, 
                org: OrgName,
                tokenInfo: '',
                role: 'admin',
                iss: time,
                exp: exp
            };  
            var result = await this.contractToken.submitTransaction('createToken',JSON.stringify(token));  
            token.txid = result.toString();
            var returnData = JSON.stringify(token);

            var queryUser = await this.contractUser.evaluateTransaction('queryUser',userId);  
            var userPublicKey = JSON.parse(queryUser.toString()).publicKey; 
            var userpbKey = pki.publicKeyFromPem(userPublicKey); 

            returnData = JSON.stringify(returnData); 
            returnData = returnData.match(/.{1,100}/g);
            var encryptedData = [];
            returnData.forEach(line => {   
                var encrypted = userpbKey.encrypt(line);
                var encrypted64 = forge.util.encode64(encrypted);
                encryptedData.push(encrypted64.toString());  
            });  

            return JSON.stringify({data: encryptedData}); 

        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`); 
            return 'requestToken Failed';
        }
    }

    this.checkExpDay = function(time){
        return true;
    }
    this.exportKey = function(info){
        return 'this is key';
    }
    
};