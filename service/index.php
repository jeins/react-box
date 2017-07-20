<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

function getData()
{
    $data = unserialize(file_get_contents(__DIR__ . '/sso-mock.php')) ?: [];

    return $data;
}

function saveData($data)
{
    file_put_contents(__DIR__ . '/sso-mock.php', serialize($data));//var_export($data, true));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $dataList = getData();

    if (isset($_GET['mode'])) {
        $mode = $_GET['mode'];

        if ($mode === 'remove') {
            $id = $_GET['id'];

            array_splice($dataList, $id, 1);
        }
        else {
            $dataKey = [
                'ewd_tenant', 'REMOTE_USER', 'USERDOMAIN', 'Shib_Identity_Provider', 'ewd_firstname', 'ewd_lastname', 'ewd_email',
                'ewd_phone',
                'ewd_mobile', 'ewd_number', 'isActive'
            ];

            $arrData = [];
            foreach ($dataKey as $key) {
                if ($key === 'isActive' && !isset($_GET[$key])) {
                    $arrData[$key] = false;
                }
                else {
                    if ($key === 'Shib_Identity_Provider') {
                        $arrData['Shib-Identity-Provider'] = $_GET[$key];
                    }
                    else {
                        $arrData[$key] = $_GET[$key];
                    }
                }
            }
            if ($mode === 'add') {
                $dataList[] = $arrData;
            }
            else if ($mode === 'update') {
                $id = $_GET['id'];

                $dataList[$id] = $arrData;
            }
        }

        saveData($dataList);
        echo true;
    }
    else {
        if ($dataList) {
            foreach ($dataList as $i => $d) {
                $dataList[$i]['Shib_Identity_Provider'] = $d['Shib-Identity-Provider'];
                unset($dataList[$i]['Shib-Identity-Provider']);
            }
        }
        echo json_encode($dataList);
    }
}