import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchGameAPI } from '../redux/actions';
import './Play.css';

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexQuestion: 0,
      countdown: 30,
    };

    this.countdown = this.countdown.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.scoreSum = this.scoreSum.bind(this);
    this.sum = this.sum.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addIndex = this.addIndex.bind(this);
  }

  componentDidMount() {
    const { resultAPI } = this.props;
    resultAPI();
    this.countdown();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.countdown === 0) {
      this.timeOut();
      document.querySelector('.btn-next').classList.remove('hidden');
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  timeOut() {
    document.querySelectorAll('.btn-answer')
      .forEach((btn) => { btn.disabled = true; });
    this.setState({ countdown: 'Your time is over! :(' });
    clearInterval(this.cronometerInterval);
  }

  countdown() {
    const ONE_SECOND = 1000;
    this.setState({ countdown: 30 });

    this.cronometerInterval = setInterval(() => {
      this.setState((prevState) => ({ countdown: prevState.countdown - 1 }));
    }, ONE_SECOND);
  }

  scoreSum(target, difficulty) {
    const { indexQuestion } = this.state;
    const { results } = this.props;
    const correct = results[indexQuestion].correct_answer;
    const state = JSON.parse(localStorage.getItem('state'));
    clearInterval(this.cronometerInterval);

    if (target.innerText === correct) {
      const score = this.sum(difficulty);
      state.player.score += score;
      state.player.assertions += 1;
    }

    localStorage.setItem('state', JSON.stringify(state));
  }

  sum(difficulty) {
    const { countdown } = this.state;
    let multiplier = 0;
    const magicThree = 3;

    if (difficulty === 'hard') multiplier = magicThree;
    if (difficulty === 'mediun') multiplier = 2;
    if (difficulty === 'easy') multiplier = 1;

    const magicTen = 10;
    return magicTen + (countdown * multiplier);
  }

  handleClick() {
    const { indexQuestion } = this.state;
    const { history } = this.props;
    const magicFour = 4;
    document.querySelector('.btn-next').classList.add('hidden');

    if (indexQuestion === magicFour) {
      history.push('/feedback');
    }
    clearInterval(this.cronometerInterval);
    this.countdown();
    this.addIndex();
  }

  addIndex() {
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1 }));
  }

  render() {
    const { results, loading } = this.props;
    const { indexQuestion, countdown } = this.state;

    if (loading === true) return <h2>Loading...</h2>;
    return (
      <div className="card-game">
        <Header index={ indexQuestion } />
        <Card question={ results[indexQuestion] } score={ this.scoreSum } />
        <span className="countdown">{countdown}</span>
        <Button
          name="Próxima"
          test="btn-next"
          onClick={ this.handleClick }
          className="btn-next hidden"
        />
      </div>
    );
  }
}

Play.propTypes = {
  resultAPI: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.playerReducer.results,
  loading: state.playerReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  resultAPI: () => dispatch(fetchGameAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
