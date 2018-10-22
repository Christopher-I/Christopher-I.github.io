$(document).ready(function() {
let trivia = [];

  let triv1 = 'Did you know that November is historically most volatile month of the year?';
  let triv2 = 'Did you know that November is historically a great time of entry for crypto traders?';
  let triv3 = 'Did you know that August and April are historically the best months of entry for long term crypto investors?';
  let triv4 = 'Did you know that November,March and June are historically the worst months of entry for long term crypto investors?';
  let triv5 = 'Did you know that if you bought bitcoin on the 4th of pril 2011 and sold it on 26th of May the following month, you would have made 43X on your investment? $1000 would have become $43,000. Go figure';
  let triv6 = 'Did you know that historically bitcoin bear markets tend to continue for over 1 year?';
  let triv7 = ' Did you know that bitcoin has srurvived over 20 major and minor bear markets?'
trivia.push(triv1);
trivia.push(triv2);
trivia.push(triv3);
trivia.push(triv4);
trivia.push(triv5);


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let result = trivia[getRandomInt(trivia.length)];

  $('#trivia').text('Trivia: ' + result);




})
