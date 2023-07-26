import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useToastNotify = () => {
  const [notify, setNotify] = useState('');
  const [notifyStatus, setNotifyStatus] = useState('success');

  const setFlash = (notify) => {
    if (notify?.message) {
        const {status, message} = notify?.message;
        if (status == 'success') {
            setNotifyStatus('success');
        }else{
            setNotifyStatus('warn');
        }
        setNotify(message);
    }

  };


  useEffect(()=>{
    if (notifyStatus && notify) {
        toast[notifyStatus](notify, {
            position       : "top-right",
            autoClose      : 5000,
            hideProgressBar: false,
            closeOnClick   : true,
            pauseOnHover   : true,
            draggable      : true,
            progress       : undefined,
            theme          : "light",
        });
        setNotify('');
    }

}, [notify]);

  return {
    setFlash,
  };
};

export default useToastNotify;
