<?php
header("Access-Control-Allow-Origin: *");
function getData()
{
    $data = unserialize(file_get_contents(__DIR__ . '/sso-mock.php')) ?: [];

    return json_encode($data);
}

function saveData($data)
{
    file_put_contents(__DIR__ . '/sso-mock.php', serialize($data));//var_export($data, true));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//    $arr = [
//        [
//            'ewd_tenant' => 'test',
//            'REMOTE_USER' => 'test',
//            'USERDOMAIN' => 'test',
//            'Shib-Identity-Provider' => 'test',
//            'ewd_firstname' => 'test',
//            'ewd_lastname' => 'test',
//            'ewd_email' => 'test',
//            'ewd_phone' => 'test',
//            'ewd_mobile' => 'test',
//            'ewd_number' => 'test',
//            'status' => false
//        ],[
//            'ewd_tenant' => 'test2',
//            'REMOTE_USER' => 'test2',
//            'USERDOMAIN' => 'test2',
//            'Shib-Identity-Provider' => 'test2',
//            'ewd_firstname' => 'test2',
//            'ewd_lastname' => 'test2',
//            'ewd_email' => 'test2',
//            'ewd_phone' => 'test2',
//            'ewd_mobile' => 'test2',
//            'ewd_number' => 'test2',
//            'status' => true
//        ]
//    ];
//    saveData($arr);
    echo getData();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

}