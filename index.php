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
require 'doyouknow.php';
?>
<h2><img src="/ico/red_apple.png" width=30 height=30>你知道吗？</h2>
<p><?=$doyouknow?></p>
<?php
if ($currentUser != null) {
	$element='<div class="history" id="historyElementmin"></div>';
	$mass='<div class="history" id="historyMass"></div>';
	$acid='<div class="history" id="historyAcid"></div>';
	$exam='<div class="history" id="historyExam"></div>';
	$deviation='<div class="history" id="historyDeviation"></div>';
}else{
	$element='<a href="login.php">登陆</a>或<a href="signup.php">注册</a>后，即可查看历史记录，赶快试试吧！';
	$mass='<a href="login.php">登陆</a>或<a href="signup.php">注册</a>后，即可查看历史记录，赶快试试吧！';
	$acid='<a href="login.php">登陆</a>或<a href="signup.php">注册</a>后，即可查看历史记录，赶快试试吧！';
	$exam='<a href="login.php">登陆</a>或<a href="signup.php">注册</a>后，即可存储战绩，赶快试试吧！';
	$deviation='<a href="login.php">登陆</a>或<a href="signup.php">注册</a>后，即可存储战绩，赶快试试吧！';
}
?>
<h2><img src="/ico/blue_apple.png" width=30 height=30><a href="element.php">元素查询</a></h2>
<p><?=nl2br($element)?></p>
<h2><img src="/ico/lime_apple.png" width=30 height=30><a href="mass.php">质量计算</a></h2>
<p><?=nl2br($mass)?></p>
<h2><img src="/ico/gray_apple.png" width=30 height=30><a href="acid.php">酸碱计算</a></h2>
<p><?=nl2br($acid)?></p>
<h2><img src="/ico/gas.png" width=30 height=30><a href="gas.php">气体计算</a></h2>
<p>使用理想气体状态方程 pV=nRT ，计算气体状态，快来试试吧！</p>
<h2><img src="/ico/orange_apple.png" width=30 height=30><a href="exam.php">元素记忆</a></h2>
<p><?=nl2br($exam)?></p>
<h2><img src="/ico/deviation.png" width=30 height=30><a href="deviation.php">偏差计算</a></h2>
<p><?=nl2br($deviation)?></p>
<?php
include 'foot.php';?>
    </section>
  </body>
</html>