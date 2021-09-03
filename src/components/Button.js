import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { name, test, disabled, onClick } = this.props;
    return (
      <button
        type="button"
        data-testid={ test }
        disabled={ disabled }
        onClick={ onClick }
      >
        { name }
      </button>
    );
  }
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
