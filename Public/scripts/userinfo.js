
$(document).ready(function(){
    $('#title4').hide();
    $('#title5').hide();

    function HideFields(arr){
	for (var i=0; i<arr.length; i++) {
            $('#foli'+arr[i]).hide();
	}
    }

    var hid_prc = ['309', '308' ,'307' ,'306' ,'305' ,'311','310'];
    var hid_ID = ['31', '44' ,'35' ,'45' ,'33' ,'46']
    var hid_agemsg = ['156','157','159'];

//    HideFields(hid_prc);
    HideFields(hid_ID);
    HideFields(hid_agemsg);

   function CheckDate() {
       var trav_m = $('#Field1-1').val();
//       console.log(trav_m.length);
       if (trav_m.length==1) { trav_m='0'+trav_m;}
       var trav_d = $('#Field1-2').val();
       if (trav_d.length==1) { trav_d='0'+trav_d;}
       var trav_y = $('#Field1').val();
       var req_date =  (trav_y + '/' + trav_m + '/' + trav_d);
       var req_day = new Date(req_date).getDay()
       var start = '2013/12/13';
       var end = '2014/03/30';
       var holidays = ['2013/12/23','2013/12/24','2013/12/25','2013/12/26','2013/12/30','2013/12/31','2014/01/01','2014/01/02','2014/01/20','2014/02/17','2014/02/18','2014/02/19','2014/02/20'];

       function CheckHolidays(list, val) {
	   for (var i = 0; i < list.length; i++) {
               if (list[i] == val) {  return true; }
	   }
	   return false;
       }
  
       if ((req_date<start)||(req_date>end)) {	
	   $('#title4').show( "slow");	 
       } else if ((req_day!=5)&&(req_day!=6)&&(req_day!=0)&&(!CheckHolidays(holidays, req_date))){
	   $('#title4').show( "slow");	 
     }
       else {	  
	   $('#title4').hide( "slow");
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

       var dep = $('input[name=Field8]:checked').val();
       var rem_seats='';
       
       if (dep!=undefined) {

	   if ((dep=='Downtown, Brooklyn')||(dep=='Union Square, Manhattan')) {
	       rem_seats=DU_rem_seats;           
	   } else if ((dep=='Williamsburg, Brooklyn')||(dep=='Astoria, Queens')) {
	       rem_seats=WA_rem_seats;           
	   }
//  console.log('rem_seats '+ rem_seats);
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
      var user_input = 'Filter1=Field1+Is_equal_to+'+date+'&pageSize=100';
         $.get('api/wufoo',{filter:user_input},NotifyUser);
   }

   function SetSeats(){
       var req_seats = $(this).val();
       var max=0;

       $('#Field11 option').each(function(){
	   max = Math.max($(this).val(), max);
	   if ($(this).val()>req_seats) { $(this).remove(); }
       })
	   
	   for (var i=max+1; i<=req_seats;i++){
	       $('#Field11').append('<option value="'+i+'">'+i+'</option>');
	   }
       
       if (req_seats>1){
	   $('#foli31').show();
	   $('#foli44').show();
       } else {
           $('#foli31').hide();
           $('#foli44').hide();
       }
       if (req_seats>2) {
	   $('#foli35').show();
	   $('#foli45').show();
       } else {
           $('#foli35').hide();
           $('#foli45').hide();
       }
       if (req_seats>3) {
	   $('#foli33').show();
	   $('#foli46').show();       
       } else {
           $('#foli33').hide();
           $('#foli46').hide();
       }
       
   }

    function SetAge() {
	var age_fld=['41','44','45','46']
	for (i=0;i<age_fld.length;i++) {
	    var age = $('#Field'+age_fld[i]).val();
	    if (age=='0-6') {
		$('#foli156').show();
	    }    else if (age=='7-14') {
		$('#foli157').show();
	    }    else if (age=='15-17') {
		$('#foli159').show();
        }
	}	
    }

    function SetTix() {	
	var Prc = {Field165:'299',Field166:'309',Field167:'308',Field168:'307',Field169:'306',Field170:'305',Field171:'311',Field172:'310'};
/*	var num_bus =$('input[name="Field165"]:checked').val();
        var num_bus_l =$('input[name="Field166"]:checked').val();
        var num_bus_e =$('input[name="Field167"]:checked').val();
        var num_bus_l_e =$('input[name="Field168"]:checked').val();
        var num_bus_all =$('input[name="Field169"]:checked').val();
        var num_bus_allbeg =$('input[name="Field170"]:checked').val();
        var num_bus_snow =$('input[name="Field171"]:checked').val();
	var num_bus_coaster =$('input[name="Field172"]:checked').val();
*/
	var Pout = eval('Prc.'+this.name);
	var num_sel =$('input[name="'+this.name+'"]:checked').val();
	$('input[name="Field'+Pout+'"][value="'+num_sel+'"]').prop('checked',true);
    }

    $('input[name=Field8]:radio').change(CheckDate);
    $('#Field1-1').keyup(CheckDate);
    $('#Field1-2').keyup(CheckDate);
    $('#Field1').keyup(CheckDate);
    $('#Field10').change(SetSeats);
    var table_fld = ['165', '166', '167', '168', '169', '170', '171', '172'];
    for (var f=0; f<table_fld.length; f++) {        
	$('input[name="Field'+table_fld[f]+'"]:radio').change(SetTix);
    }

    $('#Field41').change(SetAge);
    $('#Field44').change(SetAge);
    $('#Field45').change(SetAge);
    $('#Field46').change(SetAge);

});


$(function() {
    $( document ).tooltip();
});
