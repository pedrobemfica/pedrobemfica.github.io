const axios = require('axios');
   const express = require('express');
   const bodyParser = require('body-parser');

   const app = express();
   app.use(bodyParser.json());

   const PAGSEGURO_EMAIL = 'your_pagseguro_email';
   const PAGSEGURO_TOKEN = 'your_pagseguro_token';

   app.post('/pagseguro', async (req, res) => {
       const paymentData = {
           email: PAGSEGURO_EMAIL,
           token: PAGSEGURO_TOKEN,
           currency: 'BRL',
           itemId1: '0001',
           itemDescription1: 'Product 1',
           itemAmount1: '100.00',
           itemQuantity1: '1',
           paymentMode: 'default',
           paymentMethod: 'creditCard',
           senderName: 'John Doe',
           senderAreaCode: '11',
           senderPhone: '56273440',
           senderEmail: 'john.doe@example.com',
           senderCPF: '22111944785',
           shippingAddressStreet: 'Av. Brig. Faria Lima',
           shippingAddressNumber: '1384',
           shippingAddressComplement: '5o andar',
           shippingAddressDistrict: 'Jardim Paulistano',
           shippingAddressPostalCode: '01452002',
           shippingAddressCity: 'Sao Paulo',
           shippingAddressState: 'SP',
           shippingAddressCountry: 'BRA',
           creditCardToken: req.body.creditCardToken,
           installmentQuantity: '1',
           installmentValue: '100.00',
           noInterestInstallmentQuantity: '2',
           creditCardHolderName: 'John Doe',
           creditCardHolderCPF: '22111944785',
           creditCardHolderBirthDate: '27/10/1987',
           creditCardHolderAreaCode: '11',
           creditCardHolderPhone: '56273440',
           billingAddressStreet: 'Av. Brig. Faria Lima',
           billingAddressNumber: '1384',
           billingAddressComplement: '5o andar',
           billingAddressDistrict: 'Jardim Paulistano',
           billingAddressPostalCode: '01452002',
           billingAddressCity: 'Sao Paulo',
           billingAddressState: 'SP',
           billingAddressCountry: 'BRA'
       };

       try {
           const response = await axios.post('https://ws.pagseguro.uol.com.br/v2/transactions', paymentData, {
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
               }
           });
           res.send(response.data);
       } catch (error) {
           res.status(500).send(error.response.data);
       }
   });

   app.listen(3000, () => {
       console.log('Server is running on port 3000');
   });