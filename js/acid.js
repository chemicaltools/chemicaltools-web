function getSelectVal(){ 
    $.getJSON("acid_xml.php",{bigname:$("#AorB").val()},function(json){ 
        var acidName = $("#acidName"); 
        $("option",acidName).remove(); //清空原有的选项 
		if($("#AorB").val()=="acid"){
			var option = "<option value='HA'>HA</option>"; 
			acidName.append(option); 
		}else{
			var option = "<option value='BOH'>BOH</option>"; 
			acidName.append(option); 
		}
        $.each(json,function(index,array){ 
            var option = "<option value='"+array['name']+"'>"+array['name']+"</option>"; 
            acidName.append(option); 
        }); 
    }); 
}
function getpKa(){ 
    $.getJSON("acid_xml.php",{bigname:$("#AorB").val(),acidName:$("#acidName").val()},function(json){ 
        $.each(json,function(index,array){ 
			if(array['pKa'] != ""){
				$("#pKa").val(array['pKa']);
			}
        }); 
    }); 
}
function acid(pKainput,cinput,AorBinput,acidNameinput,did){ 
	$("#loading").html('<img src="\\ico\\loading.gif">加载中，请稍后……');
	$.post("/acid.php",{pKa:pKainput,c:cinput,AorB:AorBinput,acidName:acidNameinput,ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$("#loading").html('');
			$(did).html(data);
		}    
	});
}
$(function(){ 
	$("#form").submit(function(e) {
		acid($("#pKa").val(),$("#c").val(),$("#AorB").val(),$("#acidName").val(),"#output");
		return false;
	});
	if($("#login").val()=="1"){
		history('historyAcid','#output');
		update('pKw');
	}else{
		$("#output").html("");
	}
    getSelectVal(); 
    $("#AorB").change(function(){ 
        getSelectVal(); 
    }); 
	$("#acidName").change(function(){ 
        getpKa(); 
    }); 
}); 