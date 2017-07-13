<?php

function getData()
{
    $data = unserialize(file_get_contents(__DIR__ . '/sso-mock.php')) ?: [];

    return json_encode($data[0]);
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
//            'ewd_number' => 'test'
//        ]
//    ];

    echo json_encode(getData());
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

}