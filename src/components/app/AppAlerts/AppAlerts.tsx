import { FC } from 'react';
import IAlert from '../../../@interfaces/IAlert';
import { useAppSelector } from '../../../store';
import { selectAlerts } from '../../../store/slices/alerts';
import Alert from './Alert';
import styles from './AppAlerts.module.scss';

const AppAlerts: FC = () => {
  const alerts = useAppSelector(selectAlerts);

  return (
    <div className={styles.wrapper}>
      <div className={styles.alertsCol}>
        {alerts.map((alert: IAlert) => (
          <Alert key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AppAlerts;
