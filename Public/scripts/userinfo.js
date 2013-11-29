
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
}


$(document).ready(function(){

    $('#title4').hide();
    $('#title268').hide();

    function NotifyUser(Wufoo) {
	// $('input[name=Field8]:radio', '#form38').attr('disabled', false);
	var num_booked = Wufoo.Entries.length;
	var rem_seats = 36-num_booked;
	console.log('# remaining: '+rem_seats) ;
	if (rem_seats<=35) {
	    var req_dep = $('input[name=Field8]:checked', '#form38');	    
	//    req_dep.attr('disabled', true);
            $('#title268').show( "slow");
	} else if (rem_seats<4){
            $('#title268').hide("slow");
	    //update # bus tix dropdown
        var req_seats = $('#Field10').val();	    
	} else {
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
  
      $('input[name=Field8]:radio', '#form38').change(GetFilters);

});
