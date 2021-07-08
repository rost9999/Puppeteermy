<?php 
$url = $_POST['url']; 
exec("node .\index.js $url", $output, $retval);
foreach ($output as $o){
    echo($o);
}

?>