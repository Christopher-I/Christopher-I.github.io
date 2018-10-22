$(document).ready(function() {

       function getData2() {
         const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

         fetch(url).then(r => r.json())
           .then((bitcoinData) => {
              let priceL = bitcoinData.bpi.USD.rate_float;
              // $('#trivia').text('Did you know that November is historically the most volatile month to invest in bitcoin');

             $('#bitprice').text('$' + parseInt(priceL));
           });
       }
       getData2();

});
