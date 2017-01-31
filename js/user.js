function savesetting(modeinput,elementnumberinput,pKwinput,did){ 
	$(did).html('<img src="\\ico\\loading.gif">正在保存中……');
	$.post("/user.php",{mode:modeinput,elementnumber:elementnumberinput,pKw:pKwinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
$(function(){
	$("#form").submit(function(e) {
		savesetting($("#mode").val(),$("#elementnumber").val(),$("#pKw").val(),"#success");
		return false;
	});
	$("#mode").val($("#modeold").val());
	$("#elementnumber").val($("#elementnumberold").val());
	$("#pKw").val($("#pKwold").val());
});