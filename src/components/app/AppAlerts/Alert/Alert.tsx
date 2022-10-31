import React, { FC, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleCheck,
  faCircleInfo,
  faCircleQuestion,
  faCircleXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import AlertTypes from '../../../../@enums/AlertTypes';
import IAlert from '../../../../@interfaces/IAlert';
import { removeAlert } from '../../../../store/slices/alerts';
import { useAppDispatch } from '../../../../helpers';

export interface IAlertProps {
  alert: IAlert;
}

const Alert: FC<IAlertProps> = ({ alert }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClose = () => {
      /* third party functionality not executed by Jest */
      /* istanbul ignore next */
      dispatch(removeAlert(alert.id));
    };
    const el = ref.current;

    el!.addEventListener('close.bs.alert', handleClose);

    return () => {
      el!.removeEventListener('close.bs.alert', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let icon: IconDefinition;

  switch (alert.type) {
    case AlertTypes.Error:
      icon = faCircleXmark;
      break;
    case AlertTypes.Success:
      icon = faCircleCheck;
      break;
    case AlertTypes.Warning:
      icon = faTriangleExclamation;
      break;
    case AlertTypes.Info:
      icon = faCircleInfo;
      break;
    default:
      icon = faCircleQuestion;
  }

  return (
    <div
      ref={ref}
      data-testid={`alert-${alert.id}`}
      className={`alert alert-${alert.type} alert-dismissible fade show d-flex align-items-center`}
      role="alert">
      <FontAwesomeIcon
        data-testid={`alert-${alert.id}-icon`}
        className="flex-shrink-0 me-2"
        icon={icon}
      />
      <div>
        {alert.title ? (
          <h5 data-testid={`alert-${alert.id}-title`} className="mb-0">
            {alert.title}
          </h5>
        ) : null}
        <span data-testid={`alert-${alert.id}-text`}>{alert.text}</span>
      </div>
      <button
        type="button"
        data-testid={`alert-${alert.id}-close`}
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"></button>
    </div>
  );
};

export default Alert;
