import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { saveLoginInfo } from '../redux/actions';
import img from './trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validadeLogin = this.validadeLogin.bind(this);
    this.loginIn = this.loginIn.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validadeLogin());
  }

  validadeLogin() {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const { email, name } = this.state;
    const disabled = !(regex.test(email) && name.length >= 1);
    this.setState({
      disabled,
    });
  }

  async loginIn(path) {
    const { dispatchLogin } = this.props;
    const data = await (await fetch('https://opentdb.com/api_token.php?command=request'))
      .json();
    dispatchLogin(this.state);
    localStorage.setItem('token', JSON.stringify(data.token));
    this.handleClick(path);
  }

  handleClick(path) {
    const { history } = this.props;
    const { email, name } = this.state;
    history.push(path);
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="input-login">
        <img src={ img } alt="Trivia" className="img-trivia" />
        <label htmlFor="name">
          <input
            className="input-form-data"
            placeholder="Nome"
            id="name"
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            className="input-form-data"
            placeholder="E-mail"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <Button
          className="button-play"
          test="btn-play"
          name="Jogar"
          disabled={ disabled }
          onClick={ () => this.loginIn('/play') }
        />
        <Button
          className="button-settings"
          test="btn-settings"
          name="Configurações"
          onClick={ () => this.handleClick('/settings') }
        />
      </div>
    );
  }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (payload) => dispatch(saveLoginInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
