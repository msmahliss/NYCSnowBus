
$(document).ready(function(){
    $('#title4').hide();
    $('#title5').hide();
    $('table').find('input').each(function() {      
	if ($(this).val()!=0){	   
            $(this).attr('disabled', true);
            $(this).prop('checked', false );
	}
    })

	var today=new Date();
    $('#Field1-1').val(today.getMonth()+1);
    $('#Field1-2').val(today.getDate());
    $('#Field1').val(today.getFullYear());
		
    function HideFields(arr){
	for (var i=0; i<arr.length; i++) {
            $('#foli'+arr[i]).hide();
	}
    }
    
    var hid_prc = ['299','309', '308' ,'307' ,'306' ,'305' ,'311','310'];
    for (var n=313; n<=345; n++){
	hid_prc.push(n.toString());
    }
    var hid_ID = ['31', '44' ,'35' ,'45' ,'33' ,'46'];    
    var hid_promo = ['350','351' ,'353' ,'354'];

    HideFields(hid_prc);
    HideFields(hid_ID);
    HideFields(hid_promo);
    var today = today.getFullYear() + '/' +(today.getMonth()+ 1)+ '/'+today.getDate();    
    var end = '2014/03/30';
    var holidays = ['2014/01/20','2014/02/17','2014/02/18','2014/02/19','2014/02/20'];
    var cancelled = ['2013/12/31'];
    
    function CheckDate() {
	var trav_m = $('#Field1-1').val();
	if (trav_m.length==1) { trav_m='0'+trav_m;}
	var trav_d = $('#Field1-2').val();
	if (trav_d.length==1) { trav_d='0'+trav_d;}
	var trav_y = $('#Field1').val();
	var req_date =  (trav_y + '/' + trav_m + '/' + trav_d);
	var req_day = new Date(req_date).getDay();

	function SpecDays(list, val) {
	    for (var i = 0; i < list.length; i++) {
		if (list[i] == val) {  return true; }
	    }
	    return false;
	}

 	if ((req_date>end)||((req_day!=6)&&(req_day!=0)&&(!SpecDays(holidays, req_date)))||(SpecDays(cancelled, req_date))){
	    $('#title4').show( "slow");	 
	    $('input[name=Field8]:radio').attr('disabled', true);
            $('#Field10 option').each(function(){               
		if ($(this).val()>0) { $(this).remove(); }
            })		
		$('#Field11 option').each(function(){             
		    if ($(this).val()>0) { $(this).remove(); }
		})
		    
		    $('table').find('input').each(function() {								
			if ($(this).val()==0) {
			    $(this).prop('checked', true);			    			
			} else {
			    $(this).attr('disabled', true);
			}
		    }) } else {	  			      
			$('#title4').hide( "slow");                       	    	    
			GetFilters();
		    }
    }
    
    function NotifyUser(Entries) {

	$('input[name=Field8]:radio').attr('disabled', false); 
	$('input[name=Field8]:radio').each(function(){
	    $( 'label[for="' + this.id + '"]').removeAttr('title');
	})
	  
	var DU_num_booked = 0;
	var WA_num_booked = 0;
	var DU_num_equip = 0;
	var WA_num_equip = 0;
	
	for (i=0;i<Entries.length;i++ ){
	    if ((Entries[i].Field8=='Downtown, Brooklyn')||(Entries[i].Field8=='Union Square, Manhattan')){
		DU_num_booked += parseFloat(Entries[i].Field10);	  
		DU_num_equip += parseFloat(Entries[i].Field11);
	    }   else if ((Entries[i].Field8=='Williamsburg, Brooklyn')||(Entries[i].Field8=='Astoria, Queens')){
		WA_num_booked += parseFloat(Entries[i].Field10);
		WA_num_equip += parseFloat(Entries[i].Field11);
	    }
	};
	
	var DU_rem_seats = 35-DU_num_booked;
	var WA_rem_seats = 35-WA_num_booked;
	var DU_rem_equip = 20-DU_num_equip;
	var WA_rem_equip = 20-WA_num_equip;
        
        var trav_m = $('#Field1-1').val();        
        var trav_d = $('#Field1-2').val();        
        var trav_y = $('#Field1').val();
        var req_date =  (trav_y + trav_m + trav_d);        
	var dep = $('input[name=Field8]:checked').val();

	if (DU_rem_seats<=0) {  
	    $('#Field8_0').attr('disabled', true);	   
            $('#Field8_3').attr('disabled', true);	    	  
	    $('label[for="Field_0"]').attr('title','Downtown pick up is sold out');
            $('label[for="Field_3"]').attr('title','Union Square pick up is sold out');
	}
	if (WA_rem_seats<=0) {
            $('#Field8_1').attr('disabled', true);
            $('#Field8_2').attr('disabled', true);            	  	 
            $('label[for="Field8_1"]').attr('title','Williamsburg pick up is sold out');
            $('label[for="Field8_2"]').attr('title','Astoria pick up is sold out');
	}
	
	var rem_seats= 0;
	var rem_equip= 0;
	
	if (dep!=undefined) {	   
	    if ((dep=='Downtown, Brooklyn')||(dep=='Union Square, Manhattan')) {
		rem_seats=Math.max(0,DU_rem_seats);           
		rem_equip=Math.max(0,DU_rem_equip);
	    } else if ((dep=='Williamsburg, Brooklyn')||(dep=='Astoria, Queens')) {
		rem_seats=Math.max(0,WA_rem_seats);
		rem_equip=Math.max(0,WA_rem_equip);	       
	    }
	    //	    	   console.log('rem_seats '+ rem_seats);
	    var max=0;
	    var max_e=0;
	    $('#Field10 option').each(function(){
		max = Math.max($(this).val(), max);
		if ($(this).val()>rem_seats) { $(this).remove(); }
	    })
		
		$('#Field11 option').each(function(){
		    max_e = Math.max($(this).val(), max_e);
		    if ($(this).val()>rem_equip) { $(this).remove();}
		})
		    
		    var limit = Math.min(4,rem_seats);
	    for (var i=max+1; i<=limit;i++){
		$('#Field10').append('<option value="'+i+'">'+i+'</option>');
	    }
            var limit_e = Math.min(4,rem_equip);
            for (var i=max_e+1; i<=limit_e;i++){
		$('#Field11').append('<option value="'+i+'">'+i+'</option>');
            }       
	    
	    var req_seats=$('#Field10').val();
	    
            $('table').find('input').each(function() {
		if ($(this).val()>req_seats) {
                    $(this).attr('disabled', true);
		}
            })
		
		var tot = 0;
            $('table').find('input:checked').each(function() {
		tot+= parseFloat($(this).val());		
		if ($(this).val()>req_seats) {		    		   
                    $('input[name="'+$(this).attr('name')+'"][value="0"]' ).prop('checked', true);		   
                }
            })		
		if (tot>req_seats) {
		    $('table').find('input:checked').each(function() {
			$('input[name="'+$(this).attr('name')+'"][value="0"]' ).prop('checked', true);
		    })
			}
	}
    }
    
    function GetFilters(){	
	var trav_m = $('#Field1-1');
	var trav_d = $('#Field1-2');
	var trav_y = $('#Field1');
	var date = trav_y.val() + '-' + trav_m.val() + '-' + trav_d.val();      
        $.get('api/wufoo',{filter:date},NotifyUser);
    }
    
    function SetSeats(){
	$('table').find('input').each(function() {
            $(this).attr('disabled', false);
	})
	    
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

        $('table').find('input').each(function() {
            if ($(this).val()>req_seats) {
                $(this).attr('disabled', true);
            }
        })
	    
            var tot = 0;
        $('table').find('input:checked').each(function() {
            tot+= parseFloat($(this).val());
            if ($(this).val()>req_seats) {
                $('input[name="'+$(this).attr('name')+'"][value="0"]' ).prop('checked', true);
            }
        })
	    
            if (tot>req_seats) {
                $('table').find('input:checked').each(function() {
                    $('input[name="'+$(this).attr('name')+'"][value="0"]' ).prop('checked', true);
                })
                    }	
    }
    
    function SetTix() {		
	var req_seats=$('#Field10').val()	
	var tot=0;
	$('table').find('input:checked').each(function() {		
	    tot+= parseFloat($(this).val());                	
	})				    	    
            if (tot>req_seats) {
		$('table').find('input:checked').each(function() {
                    $('input[name="'+$(this).attr('name')+'"][value="0"]' ).prop('checked', true);
		})
                    }
	$(this).prop('checked',true);		  	
    }
        
    function FmtDate(dateText, inst) {
	var pieces = dateText.split('/');
	$('input[name=Field1-1]').val(pieces[0]);
	$('input[name=Field1-2]').val(pieces[1]);
	$('input[name=Field1]').val(pieces[2]);
	CheckDate();
    }
    	  
    $('#cal').datepicker({
	showOn: "button",
	buttonImage: "images/calendar.png",
	buttonImageOnly: true,
	buttonText: "",
	onSelect: FmtDate})

    $('input[name=Field8]:radio').change(CheckDate);    
    $('div[name=Depart]').mouseenter(CheckDate);	
    $('#Field1-1').change(CheckDate);
    $('#Field1-2').change(CheckDate);
    $('#Field1').change(CheckDate);    
    $('#Field10').change(SetSeats);
    var table_fld = ['165', '166', '167', '168', '169', '170', '171', '172'];
    for (var f=0; f<table_fld.length; f++) {        
	$('input[name="Field'+table_fld[f]+'"]:radio').change(SetTix);
    }  
});


$(function() {
    $( document ).tooltip();
});
