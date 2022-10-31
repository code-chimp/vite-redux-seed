import React, { FC, useEffect, useRef } from 'react';
import { Toast as BSToast } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import ToastTypes from '../../../../@enums/ToastTypes';
import IToastMessage from '../../../../@interfaces/IToastMessage';
import { useAppDispatch } from '../../../../helpers';
import { removeToastMessage } from '../../../../store/slices/toasts';

export interface IAppToastProps {
  toastMessage: IToastMessage;
}

const Toast: FC<IAppToastProps> = ({ toastMessage }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  let icon: IconDefinition;
  let headerText: string;
  let headerClasses = ['toast-header', ' bg-opacity-25'];

  useEffect(() => {
    const handleClose = () => {
      /* third party functionality not executed by Jest */
      /* istanbul ignore next */
      dispatch(removeToastMessage(toastMessage.id));
    };
    const el = ref.current;

    el!.addEventListener('hidden.bs.toast', handleClose);

    const toast = new BSToast(el!);
    toast.show();

    return () => {
      el!.removeEventListener('hidden.bs.toast', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (toastMessage.type) {
    case ToastTypes.Error:
      icon = faCircleXmark;
      headerText = 'Error';
      headerClasses = [...headerClasses, 'bg-danger', 'text-danger'];
      break;

    case ToastTypes.Success:
      icon = faCircleCheck;
      headerText = 'Success';
      headerClasses = [...headerClasses, 'bg-success', 'text-success'];
      break;

    case ToastTypes.Warning:
      icon = faTriangleExclamation;
      headerText = 'Warning';
      headerClasses = [...headerClasses, 'bg-warning', 'text-warning'];
      break;

    default:
      icon = faCircleInfo;
      headerText = 'Information';
      headerClasses = [...headerClasses, 'bg-info', 'text-primary'];
  }

  return (
    <div
      ref={ref}
      data-testid={`toast-${toastMessage.id}`}
      className="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true">
      <div data-testid={`toast-${toastMessage.id}-header`} className={headerClasses.join(' ')}>
        <FontAwesomeIcon
          data-testid={`toast-${toastMessage.id}-icon`}
          className="flex-shrink-0 me-2"
          icon={icon}
        />
        <strong data-testid={`toast-${toastMessage.id}-header-text`} className="me-auto">
          {headerText}
        </strong>
        <button
          type="button"
          data-testid={`toast-${toastMessage.id}-close`}
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"></button>
      </div>
      <div data-testid={`toast-${toastMessage.id}-body`} className="toast-body">
        {toastMessage.text}
      </div>
    </div>
  );
};

export default Toast;
