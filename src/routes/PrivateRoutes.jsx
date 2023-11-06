import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';
import { useContext } from 'react';

export const PrivateRoutes = ({children}) => {
    const {auth} = useContext(AuthContext);
    return auth.isLogged === true ? children : <Navigate to="/usuarios/login"/>
};

PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired
}