import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { LocalStorageService } from '../services/LocalStorage.service';

export const PrivateRoutes = ({children}) => {
    return LocalStorageService.get() ? children : <Navigate to="usuarios/login"/>
};

PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired
}