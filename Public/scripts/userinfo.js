function CheckDate() {
       var trav_m = $('#Field1-1');
       var trav_d = $('#Field1-2');
       var trav_y = $('#Field1');
       var req_date =  new Date("'"+ trav_y.val() + '-' + trav_m.val() + '-' + trav_d.val()+"'");
	var start = new Date('2013-12-06');
	var end = new Date('2014-03-30');
	var today = new Date();

	if ((req_date<start)||(req_date>end)) {
            $('#title4').show( "slow");
	} else if ((req_date.getDay()!=5)&&(req_date.getDay()!=6)&&(req_date.getDay()!=0)){
	    $('#title4').show( "slow");	    
	    }
	else if (req_date<today) {
            $('#title4').show( "slow");
	} else {
             $('#title4').hide( "slow");
	    }
console.log('Date Checked');
}


$(document).ready(function(){

    $('#title4').hide();
    $('#title268').hide();

    function NotifyUser(Wufoo) {
	// $('input[name=Field8]:radio', '#form38').attr('disabled', false);

// SetDefaults(); //you have to reset values somewhere e.g. no greyed radio boxes, dropdown {'',1-4}

	var Entries = Wufoo.Entries;
	var num_booked = 0;
	for (i=0;i<Entries.length;i++ ){
	    num_booked += parseFloat(Entries[i].Field10);	  
	};

	var rem_seats = 36-num_booked;
	if (rem_seats<=33) {  
            $('#title268').show( "slow");
            $('#Field10 option[value!=""]').remove();
            $('#Field11 option[value!=""]').remove();
	} else if (rem_seats<4){
            $('#title268').hide("slow");	    	    
	    $('#Field10 option').each(function(){
            if ($(this).val()> rem_seats) {
                $(this).remove();
            }
        }) } else {
            $('#title268').hide("slow");
	}
    }
     
    function GetFilters(){
       var path = 'https://nycbeachbus.wufoo.com/api/v3/forms/'
       var hash = 'q7ffpy71rcw52o'
       var sel = $('input[name=Field8]:checked', '#form38');
       var dep = sel.val();
       var dep_ans = $('#dep');
       var trav_m = $('#Field1-1');
       var trav_d = $('#Field1-2');
       var trav_y = $('#Field1');
       var date = trav_y.val() + '-' + trav_m.val() + '-' + trav_d.val();
       //test filter for valid date & location of departure
       //if filter is valid, hit wufoo. otherwise, do nothing

       var user_input = 'Filter1=Field1+Is_equal_to+'+date+'&Filter2=Field8+Is_equal_to+'+dep+'&pageSize=50';
          $.get('api/wufoo',{filter:user_input},NotifyUser);
    }

    function SetTix(){
	var req_seats = $('#Field10 option:selected').val();
	console.log('requested seats: '+req_seats);

	$('#Field11 option').each(function(){
	    if ($(this).val()> req_seats) {
		$(this).remove();
	    }
	})
	    }

  
    $('input[name=Field8]:radio', '#form38').change(GetFilters);
//    $('#Field1-1').change(GetFilters);
//    $('#Field1-2').change(GetFilters);
//    $('#Field1').change(GetFilters);
    $('#Field10').change(SetTix);
    
});
