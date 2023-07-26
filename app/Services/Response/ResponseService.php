<?php

namespace App\Services\Response;

class ResponseService
{
    public $resObj;

    public function __construct()
    {
        $this->resObj = new ResponseObj();
    }

    public function withSuccess($message, $data = [])
    {
        $this->resObj->status  = 'success';
        $this->resObj->message = $message;
        $this->resObj->data    = $data;

        return $this->resObj;
    }

    public function withFailed($message, $data = [])
    {
        $this->resObj->status  = 'failed';
        $this->resObj->message = $message;

        return $this->resObj;
    }
}
