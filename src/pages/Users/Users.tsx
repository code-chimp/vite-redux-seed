/* ignore while prototyping code */
/* istanbul ignore file -- @preserve */
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import IUser from '../../@interfaces/jsonApi/IUser';
import { useGetUsersQuery } from '../../store/services/json/endpoints/users';
import { unwrapRTKQueryError } from '../../helpers';

const Users: FC = () => {
  const { data: users, error, isLoading, isSuccess } = useGetUsersQuery();

  return (
    <table className="table">
      <thead>
        <tr className="table-info">
          <th />
          <th>Name</th>
          <th>City</th>
          <th>Zip</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td data-testid="loading-indicator" colSpan={4}>
              Loading...
            </td>
          </tr>
        ) : isSuccess ? (
          users.map((user: IUser) => (
            <tr key={user.id} data-testid={`row_${user.id}`}>
              <td>
                <FontAwesomeIcon icon={faMagnifyingGlass} /> <FontAwesomeIcon icon={faTrash} />
              </td>
              <td>{user.name}</td>
              <td>{user.address?.city || 'unknown'}</td>
              <td>{user.address?.zipcode || 'unknown'}</td>
              <td>{user.company?.name || 'unknown'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td data-testid="error-indicator" colSpan={4}>
              Error:{' '}
              {error ? unwrapRTKQueryError('Users.tsx', error).message : 'unexpected error'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Users;
