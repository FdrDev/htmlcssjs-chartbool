/*
function getMonthNameFromDate(date){
  //passando "date" salto tutta la parte del mom.date(day) ecc ecc
  //"DD/MM/YYYY" serve per dirgli come è composto il param date
  //altrimenti non interpreta come leggere questa data.
  var mom = moment(date,"DD/MM/YYYY");
  var monthName= mom.format("MMMM");//restituisce il mese per intero passsato nel parametro "date"

  return monthName;
}

function printKeysAndValues(object) {

  //Object.keys == valori a sinistra dell'oggetto
  keys= Object.keys(object);
  //Object.values == valori a destra dell'oggetto
  var values = Object.values(object);

  console.log("keys", keys);
  console.log("values",values);

}
*/


function loadData(){
  $.ajax({
    url:"http://157.230.17.132:4008/sales",
    method:"GET",
    data:{},
    success:function (inData) {
      printLineChart(inData);
      printLineSellerChart(inData);
    },
    error:function(){}
  });
}

function printLineChart(inData){
  var totMonth = {"January":0,"February":0,"March":0,"April":0,"May":0,"June":0,"July":0,"August":0,"September":0,"October":0,"November":0,"December":0};
  for (var i = 0; i < inData.length; i++) {
    var d = inData[i];

    var amount= d.amount;
    var date = d.date;

    var mom = moment(date,"DD/MM/YYYY");
    var montName = mom.format("MMMM");

    totMonth[montName]+= amount;
  }

  console.log(totMonth);

  var monthList = Object.keys(totMonth);//prende i nomi dei mesi dall'oggetto totMonth
  var amountList = Object.values(totMonth);//prende i valori dei mesi dall'oggetto totMonth

  console.log(monthList);
  console.log(amountList);

  createCharts2(monthList,amountList);
}

function printLineSellerChart(inData){
  var totSeller={"Marco":0,"Giuseppe":0,"Riccardo":0,"Roberto":0};
  for (var i = 0; i < inData.length; i++) {
    var d = inData[i];
    var sellerName = d.salesman;
    var sellerAmount = d.amount;
    totSeller[sellerName] += sellerAmount;
  }
  console.log("Guadagno venditori",totSeller);

  var sellerNameList = Object.keys(totSeller);
  var sellerAmountList = Object.values(totSeller);

  createCharts(sellerNameList,sellerAmountList);
}

function createCharts(sellerNameList,sellerAmountList){
  Chart.defaults.global.defaultFontColor = 'white';

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'doughnut',

      // The data for our dataset
      data: {
          labels: sellerNameList,
          datasets: [{
              label: 'SALES',
              backgroundColor: ["red","blue","yellow","grey"],
              borderColor: 'rgb(255, 255, 255)',
              data: sellerAmountList
          }]
      },
      // Configuration options go here
      options: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'white'
            }
        }
      }

  });

}


function createCharts2(monthList,amountList){
  Chart.defaults.global.defaultFontColor = 'white';

  var ctx = document.getElementById('myChart2').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: monthList,
          datasets: [{
              label: 'SALES',
              backgroundColor: 'rgba(50, 200, 255,0.5)',
              borderColor: 'rgb(255, 255, 255)',
              data: amountList
          }]
      },
      // Configuration options go here
      options: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'white'
            }
        }
      }

  });


}

function init() {
loadData();

/*
var montName= getMonthNameFromDate("12/07/17");

var obj ={
  "att1":"val1",
  "att2":"val2",
  "att3":"val3"
}

printKeysAndValues(obj);
*/
}

$(document).ready(init);
