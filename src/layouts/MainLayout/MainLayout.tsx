/* istanbul ignore file */
/* complete demo code - replace with something real then write the tests */
import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBootstrap, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import AppRoutes from '../../@enums/AppRoutes';
import Navigation from '../../components/app/Navigation';

const MainLayout: FC = () => {
  return (
    <div className="container-fluid">
      <header className="row">
        <div className="col-12 d-flex">
          <nav className="navbar navbar-expand bg-light">
            <Link className="navbar-brand" to={AppRoutes.Home}>
              <h4>
                <FontAwesomeIcon icon={faBootstrap} />+
                <FontAwesomeIcon icon={faFontAwesome} />
                Bootstrap and FontAwesome!
              </h4>
            </Link>
            <div className="container-fluid">
              <Navigation />
            </div>
          </nav>
        </div>
      </header>
      <div className="row">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
