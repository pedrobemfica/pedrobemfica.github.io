const express = require('express');
   const bodyParser = require('body-parser');
   const paypal = require('@paypal/checkout-server-sdk');

   const app = express();
   app.use(bodyParser.json());

   const payPalClient = new paypal.core.PayPalHttpClient(new paypal.core.SandboxEnvironment(
       'your_client_id',
       'your_client_secret'
   ));

   app.post('/paypal', async (req, res) => {
       const request = new paypal.orders.OrdersCreateRequest();
       request.prefer("return=representation");
       request.requestBody({
           intent: 'CAPTURE',
           purchase_units: [{
               amount: {
                   currency_code: 'USD',
                   value: '100.00'
               }
           }]
       });

       try {
           const order = await payPalClient.execute(request);
           res.json(order.result);
       } catch (error) {
           res.status(500).send(error);
       }
   });

   app.post('/paypal/capture', async (req, res) => {
       const orderId = req.body.orderId;
       const request = new paypal.orders.OrdersCaptureRequest(orderId);
       request.requestBody({});

       try {
           const capture = await payPalClient.execute(request);
           res.json(capture.result);
       } catch (error) {
           res.status(500).send(error);
       }
   });

   app.listen(3000, () => {
       console.log('Server is running on port 3000');
   });