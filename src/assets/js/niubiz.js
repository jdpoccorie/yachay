function openForm(_sessionToken, _merchantid, _purchasenumber, _amount, _action, _name, _lastName, _email, _cardNumber, _cardExpiry, _cardCvc) {

//******************* */

var elementStyles = {

    base: {
   
      color: '#666666',
   
      fontWeight: 700,
   
      fontFamily: "'Montserrat', sans-serif",
   
      fontSize: '16px',
   
      fontSmoothing: 'antialiased',
   
      placeholder: {
   
       color: '#999999',
   
      },
   
      autofill: {
   
       color: '#e39f48',
   
      },
   
    },
   
    invalid: {
   
    color: '#E25950',
   
     '::placeholder': {
   
      color: '#FFCCA5',
   
      },
   
    },
   
 };

 //payform.resetData([cardNumber,cardExpiry,cardCvc]);

 /* Caso de uso: Control unificado */

 var card = payform.createElement('card',

 {

 style: elementStyles,

 placeholder: 'Número de tarjeta'

 }

 , 'txtTarjeta');

 //card.then(element => {

 //element.on('bin', function (data) {

 /* Tú código aquí */

 //});

 //element.on('change', function (data) {

 /* Tú código aquí */

 //});

 //element.on('dcc', function (data) {

 /* Tú código aquí */

 //});

 //element.on('installments', function (data) {

 /* Tú código aquí */

 //});

 //});



 /* Caso de uso: Controles independientes */

 var cardNumber = payform.createElement('card-number',

 {

 style: elementStyles,

 placeholder: 'Número de tarjeta'

 }

 , 'txtNumeroTarjeta');

 //cardNumber.then(element => {

 //element.on('bin', function (data) {

 /* Tú código aquí */

 //});

 //element.on('change', function (data) {

 /* Tú código aquí */

 //});

 //element.on('dcc', function (data) {

 /* Tú código aquí */

 //});

 //element.on('installments', function (data) {

 /* Tú código aquí */

 //});

 //element.on('lastFourDigits', function (data) {

 /* Tú código aquí */

 //});

 //});

 var cardExpiry = payform.createElement('card-expiry',

 {

 style: elementStyles,

 placeholder: 'MM/YY'

 }

 , 'txtFechaVencimiento');

 //cardExpiry.then(element => {

 //element.on('change', function (data) {

 /* Tú código aquí */

 //});

 //});

 var cardCvc = payform.createElement('card-cvc',

 {

 style: elementStyles,

 placeholder: 'CVC'

 }

 , 'txtCvv');

 //cardCvc.then(element => {

 //element.on('change', function (data) {

 /* Tú código aquí */

 //});

 //});

/***************** */


    var configuration = {
     
        sessionkey: _sessionToken,
      
        channel: 'web',
      
        merchantid: _merchantid,
      
        purchasenumber: _purchasenumber,
      
        amount: _amount,
      
        language: 'es',
      
        font: 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap'      
       };
      
       payform.setConfiguration(configuration);
    
       var data = {
        name: _name,
        lastName: _lastName,
        cardExpiry: '03/22',
        email: _email,
        alias: 'rONALDmdD',
        recurrence: false 
        };

        payform.createToken([cardNumber,cardExpiry,cardCvc], data).then(function(response){
            return response;
        }).catch(function(error){
            return error;
        });

}