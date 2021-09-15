import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      total: 0,
    };
    this.emailUser = this.emailUser.bind(this);
  }

  componentDidMount() {
    if (localStorage.state) {
      this.getScore();
    }
  }

  componentDidUpdate(prevProps) {
    const { index } = this.props;
    if (prevProps.index !== index) {
      this.getScore();
    }
  }

  getScore() {
    const getScore = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = getScore;
    this.setState({ total: score });
  }

  emailUser() {
    const { emailPlayer } = this.props;
    return md5(emailPlayer).toString();
  }

  render() {
    const { namePlayer } = this.props;
    const { total } = this.state;
    return (
      <header data-testid="header-player-name" className="header-play">
        <img
          className="gravatar-img"
          data-testid="header-profile-picture"
          alt="imageUser"
          src={ `https://www.gravatar.com/avatar/${this.emailUser()}` }
        />
        <span className="name-player">{namePlayer}</span>
        <span data-testid="header-score" className="total-score">{total}</span>
      </header>
    );
  }
}

Header.propTypes = {
  emailPlayer: PropTypes.string.isRequired,
  namePlayer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  namePlayer: state.userReducer.name,
  emailPlayer: state.userReducer.email,
});

export default connect(mapStateToProps)(Header);
