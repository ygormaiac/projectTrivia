import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Play extends Component {
  constructor() {
    super();

    this.emailUser = this.emailUser.bind(this);
  }

  emailUser() {
    const { emailPlayer } = this.props;
    return md5(emailPlayer).toString();
  }

  render() {
    const { namePlayer } = this.props;

    return (
      <div>
        <header data-testid="header-player-name">
          <img 
          data-testid="header-profile-picture" 
          alt="imageUser" 
          src={`https://www.gravatar.com/avatar/${ this.emailUser() }`}
          />
          <span>{ namePlayer }</span>
          <span data-testid="header-score">0</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  namePlayer: state.userReducer.name,
  emailPlayer: state.userReducer.email,
})

export default connect(mapStateToProps)(Play);
