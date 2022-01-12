<?php

    header('Access-Control-Allow-Origin: *'); 
    header('Content-Type:application/json');
    header('Access-Control-Allow-Methods: PUT'); 
    header("Access-Control-Allow-Headers: access");
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once("./../Database/Database.php");

    $db=new Database();
    $con=$db->Connection();

    $data=json_decode(file_get_contents("php://input"));

    if($_SERVER["REQUEST_METHOD"] != "PUT"):
        $db->Message(0,"Page Not Found !");
        // header("HTTP/1.1 404 Not Found");
        // http_response_code(500);

    elseif(
        empty($data->id)
        || !isset($data->id)
        || !isset($data->username)
        || !isset($data->email)
        || empty($data->username)
        || empty($data->email)
    ):
        $db->Message(0,"Fill All The Required Fields !");

    elseif(!is_numeric($data->id)):
        $db->Message(0,"ID Invalide !");
    
    elseif(strlen($data->username) < 4):
        $db->Message(0,"UserName Must Be At Least 4 Characters !");

    elseif(!filter_var($data->email,FILTER_VALIDATE_EMAIL)):
        $db->Message(0,"Email Format Incorrect !");

    else:
        $id=$data->id;
        $username=trim($data->username);
        $email=trim($data->email);

        if($db->Update($id,$username,$email)):
            $db->Message(1,"User Updated Successfully !");

        endif;
    endif;
?>