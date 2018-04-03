var $ = require('jquery')
var request = require('superagent')
var moment = require('moment');

 $(document).ready(function(){

var screenWidth =  screen.width
if (screenWidth < 500){
  $('#page-one').hide()
  $('#page-two').show()
  $('#go-to-one').hide()
}


function _today () {
  var enteredDate = $('#date').val()
  console.log('enteredDate', enteredDate)
   var new_date = moment(enteredDate, "YYYY-MM-DD").add('days', 1);
  //console.log('new_date', new_date)
  var day = new_date.format('DD');
  var month = new_date.format('MM');
  var year = new_date.format('YYYY');
  tomorrow1 =''
  var tomorrow1 = day+'/'+month+'/'+year
  var tomorrow2 = year+'-'+month+'-'+day
 $('#date').val(new_date)
}

function tomorrow(){
  var enteredDate = $('#date').val()
  console.log('enteredDate', enteredDate)
  var tomorrowsDate = enteredDate.add('days', 1);
   var new_date = moment(enteredDate).format("YYYY-MM-DD")
   //var tomorrowsDate = new_date.add('days', 1);
   console.log('new_date', tomorrowsDate)
   $('#date').val(tomorrowsDate);
}


  $('.shift').click(function(e){
         shift = $(this).html()
         time = $(this).attr('value')
         date = $('#date').val()
         dateEpoch = new Date(date).valueOf()
         week = moment(date).isoWeek();
         weekNumber = week % 2
         dayNumber = moment(date).day()

           $.ajax({
                  method: "POST",
                  url: "/shifts",
                  data: {
                      shift:shift,
                      time:time,
                      date:date,
                      dateEpoch:dateEpoch,
                      weekNumber:weekNumber,
                      dayNumber:dayNumber
                    }
               })
      })
/*
              var enteredDate = $('#date').val()
              console.log('enteredDate', enteredDate)
               var new_date = moment(enteredDate, "YYYY-MM-DD").add('days', 1);
              console.log('new_date', new_date)
              var day = new_date.format('DD');
              var month = new_date.format('MM');
              var year = new_date.format('YYYY');
*/


var today = new Date();
var epochEndDate = today.setDate(today.getDate() + 14)
var formattedDate

$.ajax({
           url: "/shifts",
           success: function(result){
             getData = JSON.parse(result)
             for(var i=0; i<getData.length; i++) {
                dataReturn= getData[i]
                console.log(dataReturn)
               var dataDate = dataReturn.date
               var epochDataDate = dataReturn.dateEpoch
               var epochTodaysDate = new Date(Date.now() - 86400000)

               if(epochDataDate >= epochTodaysDate){
                    weekDay = moment(dataReturn.date).format("ddd, MMMM Do")
                    var offDay = dataReturn.shift
                    if(offDay == 'OFF'){
                      showShiftsOff()
                      children()
                    //  money()
                    }else{
                        showShifts()
                        children()
                      //  money()
                        }
            }
          }
        }
    })
function children(){
   weekNum =   dataReturn.weekNumber
    if(weekNum == '0'){
      $("[title=0]").css("background-color", '#ebf3e6');
      }
}


setTimeout(
  function money(){
  //var dayNum = dataReturn.dayNumber
    //console.log(dayNum)
  //  console.log(typeof dayNum)
    //if (weekNum == '0' && dayNum == '3'){
      //$("[title=3]").append('<img src="../styles/money.png" height="21" width="38" class="image"/>')
      $("[title=3-0]").append('<img src="../styles/money.png" height="21" width="38" class="image"/>')
      $("[title=3-0]").css('padding-right', '13px')
  //  }
  }, 5000);

function money(){
//var dayNum = dataReturn.dayNumber
  //console.log(dayNum)
//  console.log(typeof dayNum)
  //if (weekNum == '0' && dayNum == '3'){
    //$("[title=3]").append('<img src="../styles/money.png" height="21" width="38" class="image"/>')
    $("[title=3-0]").addClass('money')
    $("[title=3-0]").append('<img src="../styles/money.png" height="21" width="38" class="image"/>')
    //('padding-right', '13px')
//  }
}


               function showShiftsOff(){
                 var showShifts = ""+
                 "<div class='shiftsWrapper'>"+
                   "<div class='leftAside day-off'><div class='shiftReturn'>"+dataReturn.shift+"</div></div>"+
                     "<div class='rightWrapper' title="+dataReturn.weekNumber+">"+
                         "<div class='leftTop'>"+weekDay+"</div>" +
                         "<div class='leftBottom' title="+dataReturn.dayNumber+"-"+dataReturn.weekNumber+">"+dataReturn.time+"</div>" +
                     "</div>"+
                 "</div>"
                 $('#shift-results').append(showShifts)
               }
          function showShifts(){
            var showShifts = ""+
            "<div class='shiftsWrapper'>"+
              "<div class='leftAside'><div class='shiftReturn'>"+dataReturn.shift+"</div></div>"+
                "<div class='rightWrapper' title="+dataReturn.weekNumber+">"+
                    "<div class='leftTop'>"+weekDay+"</div>" +
                  "<div class='leftBottom' title="+dataReturn.dayNumber+"-"+dataReturn.weekNumber+">"+dataReturn.time+"</div>" +
                "</div>"+
            "</div>"
            $('#shift-results').append(showShifts)
          }



      $.ajax({
                 url: "/shifts",
                 success: function(result){
                   getDataDelete = JSON.parse(result)
                   for(var i=0; i<getData.length; i++) {
                      dataReturnDelete= getData[i]
                     var dataDateDelete = dataReturnDelete.date
                     var epochDataDate = dataReturnDelete.dateEpoch
                      deleteWeekDay = moment(dataDateDelete).format("dddd, MMMM Do")
                     var epochTodaysDate = new Date().valueOf()

                     deleteShiftDates()
                   }
                 }
               })


          function deleteShiftDates(){
            var showShiftsDelete = ""+
            "<div class='row-delete-"+dataReturnDelete._id+"'>"+
              "<div class='delete-format'>" +
                    "<button class='click-to-delete' data-id ="+dataReturnDelete._id+">Delete</button>" +
                  "<div class='column2' id='shiftReturn-delete'>"+dataReturnDelete.shift+"</div>"+
                  "<div class='column3' id='dateReturn-delete'>"+deleteWeekDay+"</div>" +
                  "<div class='column3' id='timeReturn-delete'>"+dataReturnDelete.time+"</div>" +
                "</div>"
            "</div>"
            $('#shift-results-delete').append(showShiftsDelete)
          }

           $('#shift-results-delete').delegate('.click-to-delete', 'click', function(){
               deleteShift = $(this).attr('data-id')
               $(".row-delete-"+deleteShift).fadeOut("slow")

               $.ajax({
                 url: "/delete/"+deleteShift,
                 success: function(result){
                    }
                 })
             })

 }) // end doc.ready
