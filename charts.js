$(document).ready(function() {
let myChart = document.getElementById('myChart').getContext('2d');

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontColor = '#777';
let massPopCart;
let data1 = [];
let data2 = [];
let data3 = [];

// to view data,go to file processedData.
data1 = combinedArray2;
data2 = dataAllTroughPrices;
data3 = velocityDataAll;
callChart(); //default chart view(ALL)

//method to load chart data depending on button clicked
$('#button1').click(function() {
  $('#button1').removeClass("selected");
  $(this).addClass("selected");
  data1 = dataPeakPrices20102013;
  data2 = dataTroughPrices20102013;
  data3 = velocityData20102013;
  if (massPopCart != null) {
    massPopCart.destroy(); //clear previous chart
  }
  callChart();
});


$('#button2').click(function() {
  $('#button2').removeClass("selected"); //highlight button color
  $(this).addClass("selected"); //unhighlight button color
  data1 = dataPeakPrices20132017;
  data2 = dataTroughPrices20132017;
  data3 = velocityData20132017;
  if (massPopCart != null) {
    massPopCart.destroy(); //clear previous chart canvas
  }
  callChart();
});


// $('#button3').click(function() {
//   $('#button3').removeClass("selected");
//   $(this).addClass("selected");
//   data1 = dataPeakPrices2018Now;
//   data2 = dataTroughPrices2018Now;
//   data3 = veloctityData2018Now;
//   if (massPopCart != null) {
//     massPopCart.destroy();
//   }
//   callChart();
// });


$('#buttonAll').click(function() {
  $('#buttonAll').removeClass("selected");
  $(this).addClass("selected");
  data1 = dataAllPeakPrices;
  data2 = dataAllTroughPrices;
  data3 = velocityDataAll;
  if (massPopCart != null) {
    massPopCart.destroy(); //clear previous chart
  }
  callChart();
});



function callChart() {
  massPopCart = new Chart(myChart, {
    type: 'bar',

    data: {
      datasets: [{
          fill: '0',

          data: data1,
          showLine: true,
          label: 'Peak',
          backgroundColor: '#7FDBFF',
          pointHoverBackgroundColor: 'red',
          borderWidth: 2,
          borderColor: "#7FDBFF",
          pointRadius: '2',
          type: 'line',
        },
        {
          fill: 'start',
          data: data2,
          type: 'line',
          hidden: true,
          label: 'Trough',
          labelColor: 'pink',
          backgroundColor: 'pink',
          color: "rgba(255,255,255,0)",
          borderWidth: 2,
          borderColor: "lightgray",
          pointRadius: '2.3',
          pointHoverBackgroundColor: 'red',
        },
        {
          yAxisID: "id2",
          fill: 'origin',

          data: data3,
          label: 'Velocity',
          backgroundColor: 'grey',
          fontFamily: "Quicksand",
          fillColor: "#4e8eb1",
          borderWidth: .9,
          borderColor: "grey",
        }
      ]
    },

    options: {

      scales: {
        xAxes: [{

          barPercentage: .02,
          ticks: {
            fontFamily: "Quicksand",
            fontSize: 15,
            fontColor: "gray",
          },
          display: true,
          gridLines: {
            display: false,
          },
          type: 'time',
          distribution: 'logarithmic',
          time: {
            displayFormats: {
              unit: 'month'
            }
          }
        }],
        yAxes: [{
          tooltips: {
            enabled: true,
          },
          ticks: {
            display: true,
            min: 0,
            max: 23000,
            mirror: true,
            fontFamily: "Quicksand",
            fontSize: 12,
            fontColor: "white",
            callback: function(value) {
              return '$' + value.toFixed(2);
            }
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
            position: 'left',
          type: "logarithmic",
          scaleLabel: {
            display: true,
            labelString: 'USD',
          },
          id: "price"
        }, {

          scaleLabel: {
            display: false,
            labelString: '% change',
            },
          type: "linear",
          position: "right",
              gridLines: {
            display: false,
          },
          display: false,
          ticks: {
            min: -1300,
            max: 4000,
            mirror: true,
            fontFamily: "Quicksand",
            fontSize: 12,
          },
          id: "id2"
        }]
      },
      title: {
        position: 'bottom',
        display: true,
        fontFamily: "Quicksand",
        text: 'Bitcoin Life Cycles',
        fontSize: 21,
        fontColor: 'grey'
      },
      legend: {
        position: 'left',
        fontFamily: "Quicksand",
        fontSize: 12,
        fontColor: "lightgray"
      },
      layout: {
        padding: {
          top: 0,
          left: 0,
          bottom: 0
        }
      },
    }
  });
}
})
