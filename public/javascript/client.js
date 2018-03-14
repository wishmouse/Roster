var $ = require('jquery')
var request = require('superagent')
var moment = require('moment');

 $(document).ready(function(){


  $('.shift').click(function(e){
         shift = $(this).html()
         time = $(this).attr('value')
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
                      date:date
                    }
               })

       })

var today = new Date();
var yesterday = today.setDate(today.getDate() - 1)
var formattedDate

$.ajax({
           url: "/shifts",
           success: function(result){
             getData = JSON.parse(result)
             for(var i=0; i<getData.length; i++) {
               var dataReturn= getData[i]
               var date = dataReturn.date
               currentDate()


              if(date == formattedDate ){
                 console.log('line 40')
                 
               }
             }
           }
         })

         function currentDate(){
                 var day = moment().format("DD")
                 var month = moment().format("MM")
                 var year = moment().format("YYYY")
                 formattedDate = year+"-"+month+"-"+day
               }


/*
          function hearthTile(){
            $('.delete-tile-table').remove()
            var editTemplate = ""+
                "<tr class='delete-tile-table'>"+
                  "<td class='delete-tile-button w3-padding w3-xlarge fa fa-trash'></td>"+
                  "<td class='table-description'>"+ "Tile colour: "+"</td>" +
                  "<td class='table-description-comment'><input id='colour-comment' class='colour-comment' placeholder='Colour?'/>"+"</td>" +
                  "<td class='table-quantity'>"+'1'+"</td>" +
                  "<td class='table-price' unit-price='"+hearthTileText+"'><input type='text' name='hearth-colour-price-text' class='excl-price' id='hearth-colour-price-text' value="+hearthTileText+"></input></td>" +
                  "<td class='table-vat' id='hearth-colour-vat-text'>0</td>" +
                  "<td class='table-total' id='hearth-colour-total-text'></td>" +
                "</tr>"
            quoteLine.append(editTemplate)
          }

*/

 }) // end doc.ready
