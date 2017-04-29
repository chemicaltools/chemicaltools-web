<?php
require 'load.php';
if ($currentUser != null) {
	$login=1;
}else{
	$login=0;
}
?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>首页 -- 化学e+</title>
<?php include 'head.php';?>
<script type="text/javascript" src="js/index.js"></script>
  </head>
  <body>
<?php include 'header.php';?>
    <section class="main-content">		
<?php include 'title.php';?>
<input type="hidden" id="login" name="login" value="<?=$login;?>"/> 
<input type="hidden" id="url" name="url" value="<?=urlencode($_SERVER['REQUEST_URI']);?>"/> 
<h2><img src="/ico/red_apple.png" width=30 height=30>你知道吗？</h2>
<p><div id="doyouknow"><img src="ico\loading.gif">加载中，请稍后……</div></p>
<p><a href='javascript:doyouknow("#doyouknow");'>换一个</a></p>
<h2><img src="/ico/blue_apple.png" width=30 height=30><a href="element.php">元素查询</a></h2>
<p><div class="history" id="historyElementmin"><img src="ico\loading.gif">加载中，请稍后……</div></p>
<h2><img src="/ico/lime_apple.png" width=30 height=30><a href="mass.php">质量计算</a></h2>
<p><div class="history" id="historyMass"><img src="ico\loading.gif">加载中，请稍后……</div></p>
<h2><img src="/ico/gray_apple.png" width=30 height=30><a href="acid.php">酸碱计算</a></h2>
<p><div class="history" id="historyAcid"><img src="ico\loading.gif">加载中，请稍后……</div></p>
<h2><img src="/ico/gas.png" width=30 height=30><a href="gas.php">气体计算</a></h2>
<p>使用理想气体状态方程 pV=nRT ，计算气体状态，快来试试吧！</p>
<h2><img src="/ico/orange_apple.png" width=30 height=30><a href="exam.php">元素记忆</a></h2>
<p><div class="history" id="historyExam"><img src="ico\loading.gif">加载中，请稍后……</div></p>
<h2><img src="/ico/deviation.png" width=30 height=30><a href="deviation.php">偏差计算</a></h2>
<p><div class="history" id="historyDeviation"><img src="ico\loading.gif">加载中，请稍后……</div></p>
<?php
include 'foot.php';?>
    </section>
  </body>
</html>