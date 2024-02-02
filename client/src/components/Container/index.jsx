import PropTypes from 'prop-types'

export const Container = ({ children }) => {
  return (
    <section
      style={{
        width: '100%',
        maxWidth: '1440px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 20px'
      }}
    >
      {children}
    </section>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired
}
