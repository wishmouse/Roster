var $ = require('jquery')
var request = require('superagent')

 $(document).ready(function(){


  $('.shift').click(function(e){
         shift = $(this).html()
         time = $(this).attr('value')
         timeUTC = time.toUTCString()
         date = $('#date').val()
         console.log(shift)
         console.log('time', time)
         console.log('date',date)

           $.ajax({
                  method: "POST",
                  url: "/shifts",
                  data: {
                      shift:shift,
                      time:time,
                      timeUTC:timeUTC, 
                      date:date
                    }
               })

       })

today = new Date()
todayUTC = today.toUTCString();
console.log('today--', today)
console.log('todayUTC--', todayUTC)


 }) // end doc.ready
