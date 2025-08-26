import { toast } from 'react-toastify';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationOptions {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  autoClose?: number | false;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
}

const defaultOptions: NotificationOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

class NotificationService {
  success(message: string, options?: NotificationOptions) {
    return toast.success(message, { ...defaultOptions, ...options });
  }

  error(message: string, options?: NotificationOptions) {
    return toast.error(message, { ...defaultOptions, ...options });
  }

  warning(message: string, options?: NotificationOptions) {
    return toast.warning(message, { ...defaultOptions, ...options });
  }

  info(message: string, options?: NotificationOptions) {
    return toast.info(message, { ...defaultOptions, ...options });
  }

  dismiss(toastId?: string | number) {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }

  dismissAll() {
    toast.dismiss();
  }
}

export const notifications = new NotificationService();
