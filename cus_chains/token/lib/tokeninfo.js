/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class TokenInfo extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const firstTokens = 
            {
                userid: 'user1',
		org: 'org1',
                tokenInfo: '',
                role: 'admin',
                iss: '2020/02/20',
                exp: '3030/03/30'
            }; 
	var txid = await ctx.stub.getTxID();
	await ctx.stub.putState(txid.toString(), Buffer.from(JSON.stringify(firstTokens)));
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryToken(ctx, txid) {
        const tokenAsBytes = await ctx.stub.getState(txid);
        if (!tokenAsBytes || tokenAsBytes.length === 0) {
            throw new Error(`${txid} does not exist`);
        }
        console.log(tokenAsBytes.toString());
        return tokenAsBytes.toString();
    }

    async createToken(ctx, tokenInfo) { 
	var token =  JSON.parse(tokenInfo);
	if(!token || !token['userid'] || !token['org'] || !token['iss'] || !token['exp'] ) {
	     throw new Error(`token info not accepted`);	
	}
	var txid = await ctx.stub.getTxID();
        await ctx.stub.putState(txid.toString(), Buffer.from(tokenInfo));
        return txid;
    }

    async queryAllTokens(ctx) { 
        const allResults = []; 
        for await (const { key, value } of ctx.stub.getStateByRange()) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ txid: key, data: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
}

module.exports = TokenInfo;
