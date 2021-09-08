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
    };
  }

  componentDidMount() {
    const { resultAPI } = this.props;
    resultAPI();
  }

  render() {
    const { results, loading } = this.props;
    const { indexQuestion } = this.state;

    if (loading === true) return <h2>Loading...</h2>;
    return (
      <div>
        <Header />
        <Card question={ results[indexQuestion] } />
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
