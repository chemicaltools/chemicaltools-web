function elementtable(did){ 
	$.post("elementtable.php",null,function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
function element(elementinput,did){ 
	$("#loading").html('<img src="\\ico\\loading.gif">加载中，请稍后……');
	$.post("element.php",{input:elementinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$("#loading").html('');
			$(did).html(data);
		}    
	});
}
$(function(){
	$("#form").submit(function(e) {
		element($("#input").val(),"#output");
		return false;
	});
	if($("#getinput").val()!=""){
		element($("#getinput").val(),"#output");
	}else{
		if($("#login").val()=="1"){
			history('historyElement','#output');
		}else{
			$("#output").html("");
		}
	}
	elementtable('#elementtable');
});