import ToastType from '../@types/ToastType';

interface IToastMessage {
  id: string;
  type?: ToastType;
  text?: string;
}

export default IToastMessage;
