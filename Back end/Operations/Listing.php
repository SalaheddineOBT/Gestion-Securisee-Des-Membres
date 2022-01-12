<?php

    header('Access-Control-Allow-Origin: *'); 
    header('Content-Type:application/json');
    header('Access-Control-Allow-Methods: GET'); 
    header("Access-Control-Allow-Headers: access");
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once("./../Database/Database.php");

    $db=new Database();
    $con=$db->Connection();

    if($_SERVER["REQUEST_METHOD"] != "GET"):
        $db->Message(0,"Page Not Found !");
        header("HTTP/1.1 404 Not Found");
        http_response_code(500);

    else:
        $stmt=$db->SelectAll();
        $row=$stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array(
            "success"=>1,
            "data"=>$row
        ));
    endif;

?>