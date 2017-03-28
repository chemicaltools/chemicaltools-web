<?php
header("Content-type: text/html; charset=utf-8"); 
$content=file_get_contents("https://chemapp.njzjz.win/".$_GET["type"].".php?ajax=1&html=no&input=".$_GET["input"]);
if($_GET["method"]=="1")echo nl2br($content);else echo $content;