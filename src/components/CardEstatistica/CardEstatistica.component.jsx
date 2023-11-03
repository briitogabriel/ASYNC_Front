import PropTypes from 'prop-types';

export const CardEstatistica = ({icon, value, label}) => {
    return (
            <div className="col-md-4">
                <div className="card text-center">
                    <div className="card-body">
                        <i className={`fs-1 bi ${icon}`}></i>
                        <h4 className="card-title"> {value}</h4>
                        <p className="card-text">{label}</p>
                    </div>
                </div>
            </div>
    )
};

CardEstatistica.propTypes = {
    icon: PropTypes.any.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
}