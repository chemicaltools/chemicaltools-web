<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>排行榜 -- 化学e+</title>
<?php include 'head.php';?>
  </head>
  <body>
<?php include 'header.php';
?>
    <section class="main-content">
	<? require 'load.php';
	include 'title.php';?>
		<h2>排行榜</h2>
		<table><tr><th>排名</th>
<th>昵称</th>
<th>分数</th>
</tr>
<?php
use \LeanCloud\Query;

$arr = array ();
$namearr = array();
$userQuery = new Query("_User");

$userQuery->select("username","qqname","examCorrectNumber");
$todos = $userQuery->find();
forEach($todos as $todo) {
    $examCorrectNumber = $todo->get("examCorrectNumber");
    $name = $todo->get("qqname");
	if($name==""){
		$name = $todo->get("username");
		$name=substr($name,0,strpos($name,"@"));
	}
	$arr[]=(int)$examCorrectNumber;
	$namearr[]=$name;
}
    for($i=0,$k=count($arr);$i<$k;$i++) {
        for ($j=$i+1;$j<$k;$j++) {
            if($arr[$i]<$arr[$j]){
                $temp = $arr[$j];
                $arr[$j] = $arr[$i];
                $arr[$i] = $temp;
				$nametemp = $namearr[$j];
                $namearr[$j] = $namearr[$i];
                $namearr[$i] = $nametemp;
            }
        }
    }
	
    for($i=0,$k=count($arr);$i<$k;$i++) {
		echo "<tr><td>".($i+1)."</td><td>".$namearr[$i]."</td><td>".$arr[$i]."</td></tr>";
	}
?>
</table>
<?php include 'foot.php';?>
    </section>
  </body>
</html>