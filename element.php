<?php
require 'load.php';
require 'element_xml.php';
use \LeanCloud\Query;
use \LeanCloud\User;
if($_POST['ajax'] =="1"||$_GET['ajax']=="1"){
	if($_POST['input']!=""||$_GET['input']!=""){
		if($_POST['input']!="")$input=$_POST['input'];else $input=$_GET['input'];
		$elementnumber=searchelement($input);
		if($elementnumber>0){
			$name = $elementNameArray[$elementnumber-1];
			$Abbr= $elementAbbrArray[$elementnumber-1];
			$IUPACname = $elementIUPACArray[$elementnumber-1];
			$ElementNumber=$elementnumber;
			$ElementMass=$elementMassArray[$elementnumber-1];
			$ElementOrigin=$elementOriginArray[$elementnumber-1];
			$output="元素名称：".$name."\n元素符号：".$Abbr."\nIUPAC名：".$IUPACname."\n原子序数：".$ElementNumber.
			"\n相对原子质量：".$ElementMass."\n元素名称含义：".$ElementOrigin;
			$outputHtml=$output."\n<a href='https://en.wikipedia.org/wiki/".$IUPACname."'>访问维基百科</a>";
			if ($_POST['html'] =="no"||$_GET['html']=="no"){
				echo $output;
			}else{
				require "cdn.php";
				echo "<table><tr><td><img src='img/element_".$ElementNumber.".png'></td></tr><tr><td>".nl2br($outputHtml)."</td></tr></table>";
			}
			if ($currentUser != null) {
				?>
				<script type="text/javascript">
					change("historyElementOutput", "<?=str_replace("\n","\\n",$output)?>");
					change("historyElementOutputHtml", "<?=str_replace("\n","\\n",$outputHtml)?>");
					change("historyElementNumber", "<?=(string)$ElementNumber?>");
					change("historyElement","<?=$input?>");
				</script>
				<?php
			}
		}else{
			if ($_POST['html'] =="no"||$_GET['html']=="no"){
				echo "输入有误！";
			}else{
				echo "<p>输入有误！</p>";
			}
		}
	}
}else{
	if($_POST['input']!=""||$_GET['input']!=""){
		if($_POST['input']!="")$input=$_POST['input'];else $input=$_GET['input'];
	}else{
		if ($currentUser != null) {
			$login=1;
		}else{
			$login=0;
		}
	}
?>
<!DOCTYPE html>
<html lang="zh-cn">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<?php include 'head.php';?>
		<script type="text/javascript" src="/js/element.js"></script>
		<title>元素查询 -- 化学e+</title>
	</head>
	<body>
		<?php include 'header.php';?>
		<section class="main-content">
		<?include 'title.php';?>
		<h2>元素查询</h2>
		<form method="post" id="form">
		<table><tr><table><tr><td>
		<input type="hidden" id="login" name="login" value="<?=$login;?>"  />  
		<input type="hidden" id="getinput" name="getinput" value="<?=$input;?>"  />  
		<input type="text" name="input" id="input" placeholder="请输入元素名称、符号、原子序数或IUPAC名"/></td>
		<td><input type="submit" id="elementbutton" value="查询"></td></tr></table></tr>
		<tr><div id="loading"></div></tr>
		<tr><div class="output" id="output"><img src="ico/loading.gif">加载中，请稍后……</div></tr>
</table></form>
<p>
<table style='text-align:center'>
    <tr>
        <td><h3>元素周期表</h3></td>
    </tr>
    <tr id="divc">
        <td><div class="elementtable" id="elementtable"></div></td>
    </tr>
</table>
<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
}