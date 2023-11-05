import PropTypes from 'prop-types';

export const CardUsuario = ({className, usuario}) => {
    return (
        <div className={className}>
            <div className="card">
                <div className="card-body d-flex-col">
                    <h4 className="card-title"><i className={`fs-1 bi bi-person-circle`}></i> {usuario.nome}</h4>
                    <div className="mt-4">
                        <p><span className="fw-bold">Email: </span>{usuario.email}</p>
                        <p><span className="fw-bold">Telefone: </span>{usuario.telefone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

CardUsuario.propTypes = {
    className: PropTypes.string.isRequired,
    usuario: PropTypes.object.isRequired
};