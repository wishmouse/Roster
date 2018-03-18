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

  $('.shift').click(function(e){
         shift = $(this).html()
         time = $(this).attr('value')
         date = $('#date').val()
         dateEpoch = new Date(date).valueOf()
         week = moment(date).isoWeek();
         weekNumber = weekNumber % 2
         console.log(weekNumber)

           $.ajax({
                  method: "POST",
                  url: "/shifts",
                  data: {
                      shift:shift,
                      time:time,
                      date:date,
                      dateEpoch:dateEpoch,
                      weekNumber:weekNumber
                    }
               })


              var enteredDate = $('#date').val()
              console.log('enteredDate', enteredDate)
               var new_date = moment(enteredDate, "YYYY-MM-DD").add('days', 1);
              console.log('new_date', new_date)
              var day = new_date.format('DD');
              var month = new_date.format('MM');
              var year = new_date.format('YYYY');
                                  })

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
                    weekDay = moment(dataReturn.date).format("dddd, MMMM Do")
                    var offDay = dataReturn.shift
                    if(offDay == 'OFF'){
                        showShiftsOff()
                        if(dataReturn.weekNumber == 0){
                          $('.rightWrapper').css('background', '#ebf3e6')
                        }
                    }else{
                        showShifts()
                        if(dataReturn.weekNumber == 0){
                          $('.rightWrapper').css('background', '#ebf3e6')
                        }
                      }
               }
             }
           }
         })


               function showShiftsOff(){
                 var showShifts = ""+
                 "<div class='shiftsWrapper'>"+
                   "<div class='leftAside day-off'><div class='shiftReturn'>"+dataReturn.shift+"</div></div>"+
                     "<div class='rightWrapper'>"+
                         "<div class='leftTop'>"+weekDay+"</div>" +
                         "<div class='leftBottom'>"+dataReturn.time+"</div>" +
                     "</div>"+
                 "</div>"
                 $('#shift-results').append(showShifts)
               }
          function showShifts(){
            var showShifts = ""+
            "<div class='shiftsWrapper'>"+
              "<div class='leftAside'><div class='shiftReturn'>"+dataReturn.shift+"</div></div>"+
                "<div class='rightWrapper'>"+
                    "<div class='leftTop'>"+weekDay+"</div>" +
                  "<div class='leftBottom'>"+dataReturn.time+"</div>" +
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
