/* istanbul ignore file */
/* This is just an homely little demo page and is meant to be removed from a real project */
import React from 'react';
import { useAppDispatch } from '../../helpers';
import {
  addErrorAlert,
  addInfoAlert,
  addSuccessAlert,
  addWarningAlert,
} from '../../store/slices/alerts';
import {
  addErrorToastMessage,
  addInfoToastMessage,
  addSuccessToastMessage,
  addWarningToastMessage,
} from '../../store/slices/toasts';

const NotificationsDemo = () => {
  const dispatch = useAppDispatch();

  // alerts
  const handleInfoAlert = () =>
    dispatch(addInfoAlert({ title: 'Optional Title', text: 'This is purely informational' }));

  const handleSuccessAlert = () =>
    dispatch(addSuccessAlert({ text: 'very win, highly success' }));

  const handleWarningAlert = () =>
    dispatch(addWarningAlert({ text: 'Turn back, beware of tigers' }));

  const handleErrorAlert = () =>
    dispatch(addErrorAlert({ text: 'You have been eaten by a grue.' }));

  // toasts
  const handleInfoToast = () => dispatch(addInfoToastMessage('This is purely informational'));

  const handleSuccessToast = () =>
    dispatch(addSuccessToastMessage('You succeeded, give yourself a prize'));

  const handleWarningToast = () =>
    dispatch(addWarningToastMessage('Highway to the danger zone'));

  const handleErrorToast = () => dispatch(addErrorToastMessage('The roof is on fire'));

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4>Alerts:</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button onClick={handleInfoAlert} className="btn btn-info me-3">
            Info
          </button>

          <button onClick={handleSuccessAlert} className="btn btn-success me-3">
            Success
          </button>

          <button onClick={handleWarningAlert} className="btn btn-warning me-3">
            Warning
          </button>

          <button onClick={handleErrorAlert} className="btn btn-danger">
            Error
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h4>Toasts</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button onClick={handleInfoToast} className="btn btn-info me-3">
            Info
          </button>

          <button onClick={handleSuccessToast} className="btn btn-success me-3">
            Success
          </button>

          <button onClick={handleWarningToast} className="btn btn-warning me-3">
            Warning
          </button>

          <button onClick={handleErrorToast} className="btn btn-danger">
            Error
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationsDemo;
