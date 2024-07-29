const axios = require('axios');
const url = 'https://api.oxapay.com/merchants/request';
const data = JSON.stringify({
    merchant: 'sandbox',
    amount: 30,
    currency: 'EUR',
    lifeTime: 15,
    feePaidByPayer: 0,
    underPaidCover: 0,
    callbackUrl: 'https://hkdk.events/usthcwzmz72ale',
    returnUrl: 'https://labs.fracturemc.us.to/success',
    description: 'Payment from 1xenonn for CubeEngine license',
    orderId: 'Hollywood',
    email: '1xenonn@fracturemc.us.to'
});

axios.post(url, data)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });