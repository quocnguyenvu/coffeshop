import PropTypes from 'prop-types';

export const Title = ({ title }) => {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        paddingBottom: 30,
        marginBottom: 30,
        borderBottom: '1px solid #eee',
      }}
    >
      <h1>{title}</h1>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
