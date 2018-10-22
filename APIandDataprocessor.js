$(document).ready(function() {
      //import moment from 'moment';

      const getData = () => {
          const url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2010-09-01&end=2018-10-19'; //url from coindesk that returns JSON data to be parsed

          //Method to parse JSON file from coin Desk
          fetch(url).then(r => r.json())
            .then((bitcoinData) => {
                const sortedData = []; //new array to organize and store filtered data
                let count = 0;
                //create loop to filter through the entire data and organize them in array names d,p,x and y
                for (let data in bitcoinData.bpi) {
                  sortedData.push({
                    d: moment(data).format('YYYY,MM,DD'), // date object from JSON file
                    p: bitcoinData.bpi[data].toLocaleString('us-EN', {
                      style: 'currency',
                      currency: 'USD'
                    }), // creates USD version of recieved priced to be displayed
                    x: count, //previous days
                    y: bitcoinData.bpi[data] // numerical price
                  });
                  count++; // keep track of how many loops(days) have been processed
                }
                //create vraibale which be used to calculate and store min/max values
                let arrayMaxDate = [];
                let arrayMinDate = [];
                let arrrayMaxMin = [];
                let maxValue;
                let maxFilteredArray = [];
                let minValue;
                let minFilteredArray = [];
                tempLength = 0;
                tempLength2 = 0;

                // method below to loop through all the data in increments of 3 months(90days ) and return a MAX and MIN value stored in an array which will be used to plot graph
                while (tempLength <= (sortedData.length)-2 ) {
                  //the reason for subtracting 2 from the sorted data length is because the JSON file returned from coindesk appears to contain 70 unreadable objects that create errors when parsed, so they are removed from the data
                  arrrayMaxMin.length = 0;

                  for (i = tempLength; i < (tempLength + 90); i++) {

                    arrrayMaxMin[i] = (sortedData[i].y);
                    //arrayMaxDate[i] = (sortedData[i].d);

                  }

                  // to get the max and min value, the data every 3 months is sorted from highes to lowest and the first value[0] in the array is collected
                  arrrayMaxMin.sort(function(a, b) {
                    return b - a
                  });
                  maxFilteredArray.push(arrrayMaxMin[0]);

                  let tempMaxValue = (arrrayMaxMin[0]);
                  arrrayMaxMin.sort(function(a, b) {
                    return a - b
                  });
                  minFilteredArray.push(arrrayMaxMin[0]);

                  let tempMinValue = (arrrayMaxMin[0]);

                  // after finding the minimum value, a loop is created to find its corresponding date
                  for (j = tempLength; j < (tempLength2 + 90); j++) {

                    if ((sortedData[j].y) === tempMaxValue) {
                      arrayMaxDate.push(sortedData[j].d);
                      //arrayMaxDate = (sortedData[j].d);
                    } else if ((sortedData[j].y) === tempMinValue) {
                      arrayMinDate.push(sortedData[j].d);
                    }
                  }

                  tempLength += 90;
                  tempLength2 += 90;
                }
                  //console.log(arrayMaxDate.length);

                //method to calculate the best month to invest in bitcoin by running a loop checking for the month with th
                //highest number of lowest points in bitcoin price.


let jan = 0; let feb= 0; let march = 0; let april= 0;let may = 0; let june = 0; let july = 0; let august = 0;
let sept = 0; let oct = 0; let nov = 0; let dec = 0; let monthArr = [];
var d = new Date();
          for ( i = 0; i<= 31; i ++){
            switch (arrayMaxDate[i][5] + arrayMaxDate[i][6]){

              case '01': jan++; break;
              case '02': feb++;break;
              case '03': march++;break;
              case '04': april++;break;
              case '05': may++;break;
              case '06': june++;break;
              case '07': july++;break;
              case '08': august++;break;
              case '09': sept++;break;
              case '10': oct++;break;
              case '11': nov++;break;
              case '12': dec++;break;
              default:console.log("unknown");break;
            }
            }
            jan = "January : " + jan;
          feb = "February : " + feb;
          march = "March : " + march;
          april = "April : " + april;
          may = "May : " + may;
          june = "June : " + june;
          july = "July : " + july;
          august = "August : " + august;
          sept = "September : " + sept;
          oct = "October : " + oct;
          nov = "November : " + nov;
          dec = "December : " + dec;
          monthArr.push(jan, feb, march, april, may, june, july, august, sept, oct, nov, dec);
          console.log(monthArr);

          //  d = sortedData[i].d;
          //  d = d.MM;
          //console.log (arrayMinDate[i][6]);



          //method to calculate the rate of change between each minimum and maximum value(velocity)
          //first I combine both the array cointaining maximum values and minimum values into an array called çombined array.
          // to avoid future errors, the results of the method below will be stored in a fixed array but the method itself is
          //made inert with double '//', do not delete

              combinedArray= [];
          for ( i = 0; i<= 33; i ++){
            combinedArray.push(maxFilteredArray[i] );
            combinedArray.push(minFilteredArray[i]);

          }//method temporarily made inert to avoid errors and speed up processing time, results used below
          combinedArray = [0.39, 0.059, 1.09, 0.19, 8.798, 0.68, 29.6, 6.55, 9.0701,
             2.05, 7.1136, 2.47, 5.38, 4.55, 13.5, 5.1032, 12.89, 9.8068, 27.2205,
             11.7328, 230, 26.8146, 133.5, 66.34, 393.2795, 98.33, 1147.2457, 409.1675,
              663.598, 360.8407, 665.73, 437.413, 573.3066, 319.6406, 427.2403, 177.2795,
              295.8301, 218.2741, 309.9778, 223.3086, 400.7063, 209.1322, 465.502, 312.578,
              467.803, 368.933, 768.242, 436.729, 688.0963, 552.821, 1129.87, 687.5075,
              1290.786, 914.0438, 3018.545, 1320.0513, 6013.2288, 2550.18, 19343.04,
               5518.85, 11694.4675, 6620.4088, 9826.5975, 5848.2638, 8397.635, 6143.305
          ];
          //console.log(combinedArray);

          //This method below calculated the percentage change between each maximum and minimum point(velocity)
          //in the combined array.
                  let velocityArray = [];
                  //method to calculate the rate of change between each minimum and maximum value(velocity)
                  for( i = 1; i<=combinedArray.length; i++ ){
                    let velocity = 0;
                  //console.log(velocityArray);
                  if ( combinedArray[(i)] > combinedArray[(i-1)])  {
                  velocity = ((combinedArray[(i)]/combinedArray[(i-1)]))*100;
                }else{
                  velocity = ((combinedArray[(i-1)]/combinedArray[(i)]))*(-100);
                }
                  velocityArray.push(parseInt(velocity));
                }//method temporarily made inert to avoid errors and speed up processing time, results used below
          //
           //console.log(velocityArray);
          // console.log(minFilteredArray);//method temporarily made inert to avoid errors and speed up processing time, results used below

        velocityArray=[  -661, 1847, -573, 4630, -1293, 4352, -451, 138, -442, 347, -288, 217,
          -118, 296, -264, 252, -131, 277, -232, 1960, -857, 497, -201, 592, -399,
           1166, -280, 162, -183, 184, -152, 131, -179, 133, -240, 166, -135, 142,
            -138, 179, -191, 222, -148, 149, -126, 208, -175, 157, -124, 204, -164,
            187, -141, 330, -228, 455, -235, 758, -350, 211, -176, 148, -168, 143, -136, ];

            let JSONReadyUsers = JSON.stringify(velocityArray);
            localStorage.setItem('velocityArray',JSONReadyUsers );



          //This method below calculated the COMBINED change between each maximum and minimum point(momentum)
          //in the combined array.
          //         let momentumArray = [];
          //         let momentum = 0;
          //         //method to calculate the COMBINED rate of change between each minimum and maximum value(momentum)
          //         for( i = 1; i<=combinedArray.length; i++ ){
          //         //console.log(velocityArray);
          //         momentum += ((combinedArray[(i)]-combinedArray[(i-1)])/combinedArray[(i-1)])*100;
          //         momentumArray.push(parseInt(momentum));
          //         }
          // console.log(momentumArray);//method temporarily made inert to avoid errors and speed up processing time, results used below

          // momentumArray = [-84, 1662, 1580, 6110, 6018, 10271, 10193, 10231, 10154, 10401,
          //   10336, 10453, 10438, 10635, 10573, 10725, 10701, 10879, 10822, 12682, 12594,
          //   12992, 12941, 13434, 13359, 14426, 14362, 14424, 14378, 14463, 14428, 14459,
          //   14415, 14449, 14390, 14457, 14431, 14473, 14445, 14525, 14477, 14599, 14566,
          //   14616, 14595, 14703, 14660, 14718, 14698, 14802, 14763, 14851, 14822, 15052,
          //   14996, 15351, 15294, 15952, 15881, 15993, 15949, 15998, 15957
          // ];

          // Method below is to combine the occurence dates of maximum and miniumum points, which will be used to plot
          // both the momentum and velocity graphs
              combinedDates= [];
          for ( i = 0; i<= 32; i ++){
            combinedDates.push(arrayMaxDate[i]);
            combinedDates.push(arrayMinDate[i]);

          }//method temporarily made inert to avoid errors and speed up processing time, results used below
        //  console.log(combinedDates);//method temporarily made inert to avoid errors and speed up processing time, results used below

          // combinedDates = ["2010,11,06", "2010,09,17", "2011,02,09", "2010,12,05", "2011,05,26",
          // "2011,04,04", "2011,06,08", "2011,08,06", "2011,08,28", "2011,11,18", "2012,01,08",
          // "2011,11,26", "2012,03,14", "2012,03,25", "2012,08,16", "2012,05,26", "2012,10,03",
          // "2012,08,22", "2013,02,14", "2012,11,20", "2013,04,09", "2013,02,17", "2013,05,26",
          // "2013,07,05", "2013,11,13", "2013,08,16", "2013,12,04", "2013,11,15", "2014,03,04",
          // "2014,04,10", "2014,06,03", "2014,05,13", "2014,08,11", "2014,10,05", "2014,11,12",
          // "2015,01,14", "2015,03,11", "2015,04,14", "2015,07,12", "2015,06,01", "2015,11,03",
          // "2015,08,24", "2015,12,15", "2015,11,11", "2016,04,26", "2016,02,03", "2016,06,16",
          // "2016,05,19", "2016,10,28", "2016,08,02", "2017,01,04", "2016,11,03", "2017,03,03",
          // "2017,01,29", "2017,06,11", "2017,04,28", "2017,10,21", "2017,07,26", "2017,12,16",
          // "2017,10,24", "2018,01,28", "2018,04,06", "2018,05,05", "2018,06,28", "2018,07,24", "2018,08,10"
          // ];


          // console.log("maxArray" + maxFilteredArray);
          // console.log("minArray" +minFilteredArray);
          // console.log("maxDate" + arrayMaxDate);
          // console.log("minDate" +arrayMinDate);
          //console.log(sortedData[j].d);

          });

          }
          getData();

          //display current price of bitcoin


          });
