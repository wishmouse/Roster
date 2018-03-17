var $ = require('jquery')
var request = require('superagent')
var moment = require('moment');

 $(document).ready(function(){


  $('.shift').click(function(e){
         shift = $(this).html()
         time = $(this).attr('value')
         date = $('#date').val()
         dateEpoch = new Date(date).valueOf()
         console.log('dateEpoch', dateEpoch)

           $.ajax({
                  method: "POST",
                  url: "/shifts",
                  data: {
                      shift:shift,
                      time:time,
                      date:date,
                      dateEpoch:dateEpoch
                    }
               })


              var enteredDate = $('#date').val()
              console.log('enteredDate', enteredDate)
               var new_date = moment(enteredDate, "YYYY-MM-DD").add('days', 1);
              console.log('new_date', new_date)
              var day = new_date.format('DD');
              var month = new_date.format('MM');
              var year = new_date.format('YYYY');

               tomorrow = day+"/"+month+"/"+year

              $('#date').val(tomorrow)

              var d = $('#date').text(tomorrow)
                             console.log('tomorrow', tomorrow)
       })

var today = new Date();
var epochEndDate = today.setDate(today.getDate() + 12)
var formattedDate

$.ajax({
           url: "/shifts",
           success: function(result){
             getData = JSON.parse(result)
             for(var i=0; i<getData.length; i++) {
                dataReturn= getData[i]
               var dataDate = dataReturn.date
               var epochDataDate = dataReturn.dateEpoch
               var epochTodaysDate = new Date().valueOf()
               
               currentDate()
               //console.log('dataReturn', dataReturn)

               if(epochTodaysDate < epochEndDate && epochDataDate >= epochTodaysDate){
                 console.log('dataReturn', dataReturn)
                    weekDay = moment(dataReturn.date).format("dddd, MMMM Do")
                    var offDay = dataReturn.shift
                    if(offDay == 'OFF'){
                      console.log('off Day')
                        showShiftsOff()
                    }else{
                        showShifts()
                      }


               }
             }
           }
         })



         function currentDate(){
                 var day = moment().format("DD")
                 var month = moment().format("MM")
                 var year = moment().format("YYYY")
                 formattedTodaysDate = year+"-"+month+"-"+day
               }

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


 }) // end doc.ready
