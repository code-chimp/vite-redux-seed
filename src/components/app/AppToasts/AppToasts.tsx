import React, { FC } from 'react';
import { useAppSelector } from '../../../helpers';
import { selectToasts } from '../../../store/slices/toasts';
import Toast from './Toast';

const AppToasts: FC = () => {
  const messages = useAppSelector(selectToasts);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {messages.map(message => (
        <Toast key={message.id} toastMessage={message} />
      ))}
    </div>
  );
};

export default AppToasts;
