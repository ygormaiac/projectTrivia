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
  }

  componentDidMount() {
    const { resultAPI } = this.props;
    resultAPI();
    this.countdown();
  }

  componentDidUpdate(prevProps, prevState) {
    const MIN_SECONDS = 0;
    if (prevState.countdown === MIN_SECONDS) {
      this.timeOut();
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  timeOut() {
    document.querySelectorAll('.btn-answer')
      .forEach((btn) => (btn.disabled === true));
    this.setState({ countdown: 'Seu tempo acabou! :(' });
    clearInterval(this.cronometerInterval);
  }

  countdown() {
    const ONE_SECOND = 1000;

    this.cronometerInterval = setInterval(() => {
      this.setState((prevState) => ({ countdown: prevState.countdown - 1 }));
    }, ONE_SECOND);
  }

  render() {
    const { results, loading } = this.props;
    const { indexQuestion, countdown } = this.state;

    if (loading === true) return <h2>Loading...</h2>;
    return (
      <div>
        <Header />
        <Card question={ results[indexQuestion] } />
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
