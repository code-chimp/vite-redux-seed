import React, { FC } from 'react';
import IAlert from '../../../@interfaces/IAlert';
import { useAppSelector } from '../../../helpers';
import { selectAlerts } from '../../../store/slices/alerts';
import styles from './AppAlerts.module.scss';
import Alert from './Alert';

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
