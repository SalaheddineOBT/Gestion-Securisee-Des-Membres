<?php

    header("Access-Control-Allow-Headers: access");
    header('Access-Control-Allow-Origin: *'); 
    header('Content-Type:application/json');
    header('Access-Control-Allow-Methods: DELETE'); 
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once("./../Database/Database.php");

    $db=new Database();
    $con=$db->Connection();

    $data=json_decode(file_get_contents("php://input"));

    if($_SERVER["REQUEST_METHOD"] != "DELETE"):
        // header("HTTP/1.1 404 Not Found");
        // http_response_code(500);
        $db->Message(0,"Page Not Found !");
    
    elseif(!isset($data->id) || empty($data->id)):
        $db->Message(0,"Id is Required !");

    else:
        $id=$data->id;

        if($db->Delete($id)):
            $db->Message(1,"User Deleted Successfully !");

        endif;
    endif;
?>