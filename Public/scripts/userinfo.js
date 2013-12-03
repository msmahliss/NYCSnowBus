
$(document).ready(function(){

   $('#title4').hide();

   function CheckDate() {
    var trav_m = $('#Field1-1');
    var trav_d = $('#Field1-2');
    var trav_y = $('#Field1');
    var req_date =  new Date("'"+ trav_y.val() + '-' + trav_m.val() + '-' + trav_d.val()+"'");
    var start = new Date('2013-12-06');
    var end = new Date('2014-03-30');
    var today = new Date();
       var holidays = '';

if ((req_date<start)||(req_date>end)) {
           $('#title4').show( "slow");
} else if ((req_date.getDay()!=5)&&(req_date.getDay()!=6)&&(req_date.getDay()!=0)){
   $('#title4').show( "slow");
   }
else if (req_date<today) {
           $('#title4').show( "slow");
} else {
            $('#title4').hide( "slow");
console.log ('Checking Wufoo');
    GetFilters();
}
   }

   function NotifyUser(Wufoo) {
       $('input[name=Field8]:radio').attr('disabled', false); 
       $('input[name=Field8]:radio').each(function(){
	   $( 'label[for="' + this.id + '"]').removeAttr('title');
       })
       var Entries = Wufoo.Entries;
       var DU_num_booked = 0;
       var WA_num_booked = 0;

       for (i=0;i<Entries.length;i++ ){
	   if ((Entries[i].Field8=='Downtown, Brooklyn')||(Entries[i].Field8=='Union Square, Manhattan')){
	   DU_num_booked += parseFloat(Entries[i].Field10);	  
	   }   else if ((Entries[i].Field8=='Williamsburg, Brooklyn')||(Entries[i].Field8=='Astoria, Queens')){
	   WA_num_booked += parseFloat(Entries[i].Field10);	                 
	   }
       };

       var DU_rem_seats = 35-DU_num_booked;
       var WA_rem_seats = 35-WA_num_booked;
       //console.log('book seats: '+num_booked+' / rem seats: '+rem_seats);
       
       if (DU_rem_seats<=0) {  
	   $('#Field8_0').attr('disabled', true);	   
           $('#Field8_3').attr('disabled', true);
	   $('#Field8_0').prop('checked', false );
	   $('#Field8_3').prop('checked', false );	  
	   $('label[for="Field_0"]').attr('title','This pick-up location is sold out');
           $('label[for="Field_3"]').attr('title','This pick-up location is sold out');
       }
       if (WA_rem_seats<=0) {
           $('#Field8_1').attr('disabled', true);
           $('#Field8_2').attr('disabled', true);
           $('#Field8_1').prop('checked', false );
           $('#Field8_2').prop('checked', false );	  	 
           $('label[for="Field8_1"]').attr('title','This pick-up location is sold out');
           $('label[for="Field8_2"]').attr('title','This pick-up location is sold out');
       }

       var dep = $('input[name=Field8]:checked', '#form38').val();
       var rem_seats='';
       
       if (dep!=undefined) {

	   if ((dep=='Downtown, Brooklyn')||(dep=='Union Square, Manhattan')) {
	       rem_seats=DU_rem_seats;           
	   } else if ((dep=='Williamsburg, Brooklyn')||(dep=='Astoria, Queens')) {
	       rem_seats=WA_rem_seats;           
	   }
	   console.log('rem_seats '+ rem_seats);
	   var max=0;
	   $('#Field10 option').each(function(){
	       max = Math.max($(this).val(), max);
	       if ($(this).val()>rem_seats) { $(this).remove(); }
	   })
	   var limit = Math.min(4,rem_seats);
	   for (var i=max+1; i<=limit;i++){
	       $('#Field10').append('<option value="'+i+'">'+i+'</option>');
	   }
       }
}

   function GetFilters(){
      var path = 'https://nycbeachbus.wufoo.com/api/v3/forms/'
      var hash = 'q7ffpy71rcw52o';
      var trav_m = $('#Field1-1');
      var trav_d = $('#Field1-2');
      var trav_y = $('#Field1');
      var date = trav_y.val() + '-' + trav_m.val() + '-' + trav_d.val();
      //test filter for valid date & location of departure. if valid, hit Wufoo API
      var user_input = 'Filter1=Field1+Is_equal_to+'+date+'&pageSize=100';
         $.get('api/wufoo',{filter:user_input},NotifyUser);
   }

   function SetTix(){
       var req_seats = $('#Field10 option:selected').val();

       $('#Field11 option').each(function(){
	   if ($(this).val()>req_seats) { $(this).remove(); }
       })

	   var max=0;
       $('#Field11 option').each(function(){
	   max = Math.max($(this).val(), max);
       })
	   for (var i=max+1; i<=req_seats;i++){
	       $('#Field11').append('<option value="'+i+'">'+i+'</option>');
	   }
   }              

    $('input[name=Field8]:radio', '#form38').change(CheckDate);
    $('#Field1-1').keyup(CheckDate);
    $('#Field1-2').keyup(CheckDate);
    $('#Field1').keyup(CheckDate);
    $('#Field10').change(SetTix);
});


$(function() {
    $( document ).tooltip();
});
