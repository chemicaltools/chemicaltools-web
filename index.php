<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>首页 -- 化学e+</title>
<?php include 'head.php';?>
  </head>
  <body>
<?php include 'header.php';?>
    <section class="main-content">		
<?php
require 'load.php';
include 'title.php';
if ($currentUser != null) {
	$element=$currentUser->get("historyElementOutputHtml");
	$mass=$currentUser->get("historyMassOutput");
	$acid=$currentUser->get("historyAcidOutput");
	$correct=(int)($currentUser->get("examCorrectNumber"));
	$incorrect=(int)($currentUser->get("examIncorrectnumber"));
	$sum=$correct+$incorrect;
	$rate=(double)$correct/(double)$sum*100;
	$exam= '共回答'.$sum.'题，其中'.$correct.'题正确，正确率为'.sprintf("%.2f", $rate).'%';
?>
<h2><a href="element.html">元素查询</a></h2>
<p><?=nl2br($element)?></p>
<h2>质量计算</h2>
<p><?=nl2br($mass)?></p>
<h2>酸碱计算</h2>
<p><?=nl2br($acid)?></p>
<h2><a href="exam.html">元素记忆</a></h2>
<p><?=nl2br($exam)?></p>
<?php
}
include 'foot.php';?>
    </section>
  </body>
</html>