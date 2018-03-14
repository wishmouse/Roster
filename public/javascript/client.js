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
         //console.log(shift)
         //console.log('time', time)
         //console.log('date',date)

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

       })

var today = new Date();
var epochEndDate = today.setDate(today.getDate() + 2)
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
               console.log('epochEndDate', epochEndDate)
              console.log('epochDataDate', epochDataDate)
               //console.log('dataDate', dataDate)
               //console.log('formattedTodaysDate', formattedTodaysDate)
               console.log('epochTodaysDate', epochTodaysDate)

               if(epochTodaysDate < epochEndDate && epochDataDate >= epochTodaysDate){
                    console.log('dataReturn', dataReturn)
                    showShifts()
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



          function showShifts(){
            var showShifts = ""+
                "<div class='show-shifts'>"+
                  "<div class='table-date'>"+dataReturn.date+"</div>" +
                  "<div class='table-shift'>"+ dataReturn.shift+"</div>" +
                  "<div class='table-time'>"+dataReturn.time+"</div>" +
                "</div>"
            $('#shift-results').append(showShifts)
          }


 }) // end doc.ready
