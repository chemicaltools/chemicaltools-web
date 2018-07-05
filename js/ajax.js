function history(hisname,did){ 
	$.post("ajax.php",{name:hisname},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
function change(changename,changevalue){ 
	$.post("change.php",{name:changename,value:changevalue});
}
function update(updatename){ 
	$.post("update.php",{name:updatename});
}
function changescore(){ 
	$.post("changescore.php");
}