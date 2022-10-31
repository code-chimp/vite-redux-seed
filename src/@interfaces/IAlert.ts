import AlertType from '../@types/AlertType';

interface IAlert {
  id: string;
  type: AlertType;
  text?: string;
  title?: string;
}

export default IAlert;
