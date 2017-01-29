<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>元素查询 -- 化学e+</title>
<?php include 'head.php';?>
  </head>
  <body>
<?php include 'header.php';
?>
    <section class="main-content">
	<? require 'load.php';
	require 'element_xml.php';
	include 'title.php';?>
		<h2>元素查询</h2>
		<form method='post' action='element.php'>
		<table><tr><table><tr><td><input type="text" name="input" placeholder="请输入元素名称、符号、原子序数或IUPAC名"/></td><td><input type="submit" value="查询"></td></tr></table></tr>
<?php
use \LeanCloud\Query;
use \LeanCloud\User;
if($_POST['input']!=""||$_GET['input']!=""){
	if($_POST['input']!="")$input=$_POST['input'];else $input=$_GET['input'];
	/*
	$nameQuery = new Query("Element");
	$nameQuery->equalTo("ElementName", $input);
	$AbbrQuery = new Query("Element");
	$AbbrQuery->equalTo("ElementAbbr", ucfirst($input));
	$NumberQuery= new Query("Element");
	$NumberQuery->equalTo("ElementNumber", (int)$input);
	$IUPACQuery= new Query("Element");
	$IUPACQuery->equalTo("ElementIUPACname", ucfirst($input));
	$query = Query::orQuery($nameQuery, $AbbrQuery,$NumberQuery,$IUPACQuery);
	*/
	$elementnumber=searchelement($input);
	//if($query->count()>0){
	if($elementnumber>0){
		/*
		$todo = $query->first();
		$name=$todo->get("ElementName");
		$Abbr=$todo->get("ElementAbbr");
		$IUPACname = $todo->get("ElementIUPACname");
		$ElementNumber=$todo->get("ElementNumber");
		$ElementMass=$todo->get("ElementMass");
		$ElementOrigin=$todo->get("ElementOrigin");
		*/
		$name = $elementNameArray[$elementnumber-1];
		$Abbr= $elementAbbrArray[$elementnumber-1];
		$IUPACname = $elementIUPACArray[$elementnumber-1];
		$ElementNumber=$elementnumber;
		$ElementMass=$elementMassArray[$elementnumber-1];
		$ElementOrigin=$elementOriginArray[$elementnumber-1];
		$output="元素名称：".$name."\n元素符号：".$Abbr."\nIUPAC名：".$IUPACname."\n原子序数：".$ElementNumber.
		"\n相对原子质量：".$ElementMass."\n元素名称含义：".$ElementOrigin;
		$outputHtml=$output."\n<a href='https://en.wikipedia.org/wiki/".$IUPACname."'>访问维基百科</a>";
		echo "<tr><table><tr><td><img src='img/element_".$ElementNumber.".png'></td></tr><tr><td>".nl2br($outputHtml)."</td></tr></table></tr>";
		if ($currentUser != null) {
			//$currentUser->set("historyElementOutput", $output);
			//$currentUser->set("historyElementOutputHtml", $outputHtml);
			//$currentUser->set("historyElementNumber", (string)$ElementNumber);
			//$currentUser->set("historyElement", $input);
			//$currentUser->save();?>
			<script type="text/javascript">
				change("historyElementOutput", "<?=str_replace("\n","\\n",$output)?>");
				change("historyElementOutputHtml", "<?=str_replace("\n","\\n",$outputHtml)?>");
				change("historyElementNumber", "<?=(string)$ElementNumber?>");
				change("historyElement","<?=$input?>");
			</script>
			<?php
		}
	}else{
		echo "<p>输入有误！</p>";
	}
}else{
	if ($currentUser != null) {
		//$ElementNumber=$currentUser->get("historyElementNumber");
		//$outputHtml=$currentUser->get("historyElementOutputHtml");
		//echo "<tr><table><tr><td><img src='img/element_".$ElementNumber.".png'></td></tr><tr><td>".nl2br($outputHtml)."</td></tr></table></tr>";
		?>
		<tr><script type="text/javascript">
			history('historyElement','#historyElement');
		</script>
		<div class="history" id="historyElement"><img src="\ico\loading.gif">加载中，请稍后……</div>
		</tr>
		<?php
	}
}

?></table></form>
<p>
<script type="text/javascript">
	elementtable('#elementtable');
</script>
		<div class="elementtable" id="elementtable"></div>
<?php include 'foot.php';?>
    </section>
  </body>
</html>