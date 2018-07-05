function deviation(deviationinput,did){ 
	$("#loading").html('<img src="\\ico\\loading.gif">加载中，请稍后……');
	$.post("deviation.php",{input:deviationinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$("#loading").html('');
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