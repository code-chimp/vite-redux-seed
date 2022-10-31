import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { decrement, increment, selectCount } from '../../store/slices/counter';
import { useAppDispatch, useAppSelector } from '../../helpers';

const Counter: FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div className="row">
      <div className="col-12">
        <button
          aria-label="Increment value"
          data-testid="add-button"
          className="btn btn-success"
          onClick={() => dispatch(increment())}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <span className="mx-5 fw-bold fs-3" data-testid="output-display">
          {count}
        </span>
        <button
          aria-label="Decrement value"
          data-testid="subtract-button"
          className="btn btn-danger"
          onClick={() => dispatch(decrement())}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
};

export default Counter;
