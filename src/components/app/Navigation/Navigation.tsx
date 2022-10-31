/* istanbul ignore file */
/* no logic */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../../../@enums/AppRoutes';

const Navigation: FC = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to={AppRoutes.Home}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={AppRoutes.Users}>
          Users
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={AppRoutes.Notifications}>
          Notifications
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
