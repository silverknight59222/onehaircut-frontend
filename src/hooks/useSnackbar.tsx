import { toast } from 'react-toastify';

const useSnackbar = () => {
    const showSnackbar = (type: string, message: string) => {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'info':
                toast.info(message);
                break;
            case 'warning':
                toast.warning(message);
                break;
            default:
                toast(message);
                break;
        }
    };
    
    return showSnackbar;
};

export default useSnackbar;