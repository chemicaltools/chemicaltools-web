function gas(typeinput,pinput,Vinput,ninput,Tinput){ 
	$("#loading").html('<img src="\\ico\\loading.gif">加载中，请稍后……');
	$.post("/gas.php",{type:typeinput,p:pinput,V:Vinput,n:ninput,T:Tinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$("#loading").html('');
			switch(typeinput){
				case "p":
					$("#p").val(data);
					break;
				case "V":
					$("#V").val(data);
					break;
				case "n":
					$("#n").val(data);
					break;
				case "T":
					$("#T").val(data);
					break;
			}
		}    
	});
}
$(function(){
	$("#form").submit(function(e) {
		gas($("input[name='type']:checked").val(),$("#p").val(),$("#V").val(),$("#n").val(),$("#T").val());
		return false;
	});
});