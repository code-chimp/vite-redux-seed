import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers';
import AsyncStates from '../../@enums/AsyncStates';
import IUser from '../../@interfaces/IUser';
import { loadUsers, selectUsers } from '../../store/slices/user';

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  // ad-hoc selectors
  const status = useAppSelector(state => state.user.status);
  const error = useAppSelector(state => state.user.error);

  useEffect(() => {
    // Let us suppose that fetching the users is an expensive operation
    // that we want to repeat as little as possible. By keeping the collection
    // in the global store we can reduce the number of queries we will need to
    // make to the back end to retrieve identical information.
    //
    // Should we unload, then later reload this component, the slice will likely
    // have a status of 'AsyncStates.Success' and the users array will contain
    // elements - therefore no "dispatch" to loadUsers will occur
    if (status === AsyncStates.Idle && !users.length) {
      dispatch(loadUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table className="table">
      <thead>
        <tr className="table-info">
          <th>Name</th>
          <th>City</th>
          <th>Zip</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {users.length ? (
          users.map((user: IUser) => (
            <tr key={user.id} data-testid={`row_${user.id}`}>
              <td>{user.name}</td>
              <td>{user.address?.city || 'unknown'}</td>
              <td>{user.address?.zipcode || 'unknown'}</td>
              <td>{user.company?.name || 'unknown'}</td>
            </tr>
          ))
        ) : status === AsyncStates.Fail ? (
          <tr>
            <td data-testid="error-indicator" colSpan={4}>
              Error: {error}
            </td>
          </tr>
        ) : (
          <tr>
            <td data-testid="loading-indicator" colSpan={4}>
              Loading...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Users;
