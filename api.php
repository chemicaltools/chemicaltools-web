<?php
header("Content-type: text/html; charset=utf-8"); 
echo file_get_contents("https://chemapp.njzjz.win/".$_GET["type"].".php?ajax=1&html=no&input=".$_GET["input"]);