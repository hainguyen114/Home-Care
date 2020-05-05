/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class UserInfo extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const users = [
            {
                userId: 'trang01',
		info: {
			name: 'trang nguyen',
			publicKey:'this is pbkey',
		}
            },
             
        ];

        for (let i = 0; i < users.length; i++) {
            await ctx.stub.putState(users[i].userId, Buffer.from(JSON.stringify(users[i].info)));
            console.info('Added <--> ', users[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryUser(ctx, userId) {
        const userAsBytes = await ctx.stub.getState(userId); 
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${userId} does not exist`);
        }
        console.log(userAsBytes.toString());
        return userAsBytes.toString();
    }

    async createUser(ctx, userId, userJsonStringInfo) {
        const userAsBytes = await ctx.stub.getState(userId);  
        if (userAsBytes && userAsBytes.length > 0) {
            throw new Error(`${userId} existed`);
        } 
        await ctx.stub.putState(userId.toString(), Buffer.from(userJsonStringInfo)); 
        return 'submitted';
    }

    async queryAllUsers(ctx) {
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange()) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeUserPublicKey(ctx, userId, oldPublicKey, newPublicKey) {
        // console.info('============= START : changeCarOwner ===========');

        // const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        // if (!carAsBytes || carAsBytes.length === 0) {
        //     throw new Error(`${carNumber} does not exist`);
        // }
        // const car = JSON.parse(carAsBytes.toString());
        // car.owner = newOwner;

        // await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        // console.info('============= END : changeCarOwner ===========');
        return 'nonennnnnnn';
    }

}

module.exports = UserInfo;
