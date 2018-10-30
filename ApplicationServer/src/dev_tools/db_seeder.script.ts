import * as mongoose from 'mongoose';
import User from '../models/User';
import DBService from '../util/dbUtil';

DBService.connect();

for (let i = 0; i < 20; i++) {
    let userReference = new User();
    userReference.email = `test${i}@test.com`;
    userReference.password = `trustNo1-${i}`;
    userReference.username = `Nick${i}`;
    userReference.save((err) => {
        if (err) {
            console.log(err);
        }
    });
}