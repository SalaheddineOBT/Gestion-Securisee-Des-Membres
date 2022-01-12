<?php
    header('Access-Control-Allow-Origin: *'); 
    header('Content-Type:application/json');
    header('Access-Control-Allow-Methods: POST'); 
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once("./../Database/Database.php");

    $db=new Database();
    $con=$db->Connection();

    $data=json_decode(file_get_contents("php://input"));

    if($_SERVER["REQUEST_METHOD"] != "POST"):
        $db->Message(0,"Page Not Found !");
        // header("HTTP/1.1 404 Not Found");
        // http_response_code(500);

    elseif(
        !isset($data->email)
        || !isset($data->password)
        || empty($data->email)
        || empty($data->password)
    ):
        $db->Message(0,"Fill All The Required Fields !"); 

    elseif(!filter_var($data->email,FILTER_VALIDATE_EMAIL)):
        $db->Message(0,"Email Format Incorrect !");

    elseif(strlen($data->password) < 8):
        $db->Message(0,"Password Must Be At Least 8 Characters !");

    else:
        $email=trim($data->email);
        $password=trim($data->password);

        $stmt=$db->Login($email,$password);
        if($stmt->rowCount()):
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(array("success"=>1,"data"=>$row));
        else:
            $db->Message(0,"Email Or Password is Incorecte !");
        endif;

    endif;
?>