function deviation(deviationinput,did){ 
	$.post("/deviation.php",{input:deviationinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
$(function(){
	$("#form").submit(function(e) {
		deviation($("#input").val(),"#output");
		return false;
	});
	if($("#login").val()=="1"){
		history('historyDeviation','#output');
	}else{
		$("#output").html("");
	}
});