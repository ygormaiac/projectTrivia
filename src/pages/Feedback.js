import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      rightAnswers: 0,
      total: 0,
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleMessage();
  }

  handleMessage() {
    const getScore = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions, score } } = getScore;

    const NUM_ANSWER = 3;
    if (assertions < NUM_ANSWER) {
      this.setState({ message: 'Podia ser melhor...' });
    } else {
      this.setState({ message: 'Mandou bem!' });
    }

    this.setState({
      rightAnswers: assertions,
      total: score,
    });
  }

  handleClick(path) {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { message, rightAnswers, total } = this.state;

    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{message}</h1>
        <p>
          {'Você acertou '}
          <span data-testid="feedback-total-question">{rightAnswers}</span>
          {' pergunta(s)'}
        </p>
        <p>
          Pontuação total:
          <span data-testid="feedback-total-score">{total}</span>
        </p>
        <Button
          test="btn-play-again"
          name="Jogar novamente"
          onClick={ () => this.handleClick('/') }
        />
        <Button
          test="btn-ranking"
          name="Ver Ranking"
          onClick={ () => this.handleClick('/ranking') }
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
