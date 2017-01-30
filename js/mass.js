function mass(massinput,did){ 
	$.post("/mass.php",{input:massinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
$(function(){
	$("#form").submit(function(e) {
		mass($("#input").val(),"#output");
		return false;
	});
	if($("#getinput").val()!=""){
		mass($("#getinput").val(),"#output");
	}else{
		if($("#login").val()=="1"){
			history('historyMass','#output');
		}else{
			$("#output").html("");
		}
	}
});