function sumAmountPerMonth(data){
  var amountMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];

  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var amount = d.amount;
    var dataaa = d.date;

    var dataSplit = dataaa.split("/");
    var month = Number(dataSplit[1]);//["01","12","2017"]

    amountMonth[month-1]+=amount;
  }
  createCharts2(amountMonth);
  var total =0;
  for (var i = 0; i < amountMonth.length; i++) {
    total+=Number(amountMonth[i]);
  }
  return total
}


function getAmountMonthByAjax() {

  $.ajax({
    url:"http://157.230.17.132:4008/sales",
    method:"GET",
    data:{},
    success:function (data) {
      var total = sumAmountPerMonth(data);
      amountSellerPerYear(total,data);
    },
    error:function(){}
  });
}

function amountSellerPerYear(total,data){
  var sellers=[{name:"Marco",amount:0},
               {name:"Giuseppe",amount:0},
               {name:"Riccardo",amount:0},
               {name:"Roberto",amount:0}]
  var d = data;
  for (var i = 0; i < d.length; i++) {
    var name = d[i].salesman;
    var amount = d[i].amount;

    checkNameSalesman(name,amount,sellers);
  }
  var totalEars = total;

  console.log(sellers);
  getPercentualSellers(sellers,total);
}

function checkNameSalesman(name,amount,sellers){
  switch (name) {
    case "Marco":
    sellers[0].amount+=amount;
    break;

    case "Giuseppe":
    sellers[1].amount+=amount;
    break;

    case "Riccardo":
    sellers[2].amount+=amount;
    break;

    case "Roberto":
    sellers[3].amount+=amount;
    break;
    default:
  }
}

function getPercentualSellers(sellers,total){
  var sellersPercent = [0,0,0,0]

  for (var i = 0; i < sellers.length; i++) {
    var amount = sellers[i].amount;

    var percent = (amount/total)*100;
    sellersPercent[i]+=percent;
  }

  createCharts(sellersPercent);
}

function createCharts(sellersPercent){
  Chart.defaults.global.defaultFontColor = 'white';

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'doughnut',

      // The data for our dataset
      data: {
          labels: ['Marco', 'Giuseppe', 'Riccardo', 'Roberto'],
          datasets: [{
              label: 'Sellers',
              backgroundColor: ["red","blue","yellow","grey"],
              borderColor: 'rgb(255, 255, 255)',
              data: sellersPercent
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

function createCharts2(amountMonth){
  Chart.defaults.global.defaultFontColor = 'white';

  var ctx = document.getElementById('myChart2').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November','December'],
          datasets: [{
              label: 'SALES',
              backgroundColor: 'rgba(50, 200, 255,0.5)',
              borderColor: 'rgb(255, 255, 255)',
              data: amountMonth
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
  getAmountMonthByAjax();
}

$(document).ready(init);
