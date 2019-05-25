const bcrypt = require('bcrypt');
const { MD5 } = require('crypto-js');
const jwt=require('jsonwebtoken')

/*bcrypt.genSalt(10,(err,salt)=>{
    if(err) return next(err);

    bcrypt.hash('ramseylenon',salt,(err,hash)=>{
        if(err) return next(err)
        console.log(hash)
    })
})*/
/*const secret='mysecret'
const secretSalt='ghghghghghghghgh'

const user={
    id:1,
    token:MD5('ramseylenon').toString()+secretSalt
}
const receivedToken='d6f03585f4068cf91699191f6e5f3545ghghghghghghghgh'

if (receivedToken==user.token) {
    console.log('success')
}*/

const id=1
const secret='ramseylenon'

const recievedToken= 'eyJhbGciOiJIUzI1NiJ9.MQ.0sMJ0GOqwmCBvZ6n-me6BfduUuAqRCr8LbTR12JHeP0'

const token=jwt.sign(id,secret);
const decodeToken=jwt.verify(recievedToken,secret)

console.log(decodeToken)
