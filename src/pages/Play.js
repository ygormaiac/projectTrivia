import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Card from '../components/Card';
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
  }

  componentDidMount() {
    const { resultAPI } = this.props;
    resultAPI();
    this.countdown();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.countdown === 0) {
      this.timeOut();
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  timeOut() {
    document.querySelectorAll('.btn-answer')
      .forEach((btn) => { btn.disabled = true; });
    this.setState({ countdown: 'Yout time is over! :(' });
    clearInterval(this.cronometerInterval);
  }

  countdown() {
    const ONE_SECOND = 1000;

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

  render() {
    const { results, loading } = this.props;
    const { indexQuestion, countdown } = this.state;

    if (loading === true) return <h2>Loading...</h2>;
    return (
      <div>
        <Header />
        <Card question={ results[indexQuestion] } score={ this.scoreSum } />
        <span>{countdown}</span>
      </div>
    );
  }
}

Play.propTypes = {
  resultAPI: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.playerReducer.results,
  loading: state.playerReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  resultAPI: () => dispatch(fetchGameAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
