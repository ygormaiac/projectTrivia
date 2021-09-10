import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shuffleList: [],
    };

    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.shuffleAnswers();
  }

  shuffleAnswers() {
    const { question } = this.props;
    if (question) {
      const { correct_answer: correct,
        incorrect_answers: incorrect } = question;

      const correctAnswer = {
        testId: 'correct-answer',
        answer: correct,
      };
      const incorrectAnswer = incorrect
        .map((answer, i) => ({
          testId: `wrong-answer-${i}`,
          answer,
        }));
      const allAnswers = [...incorrectAnswer, correctAnswer];
      for (let i = allAnswers.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }
      this.setState({ shuffleList: allAnswers });
    }
  }

  handleClick({ target }) {
    const { question, score } = this.props;
    const { correct_answer: correct } = question;

    score(target, question.difficulty);

    document.querySelectorAll('.btn-answer').forEach((btn) => {
      if (btn.innerText === correct) {
        btn.classList.add('green');
        btn.disabled = true;
      } else {
        btn.classList.add('red');
        btn.disabled = true;
      }
    });
  }

  render() {
    const { shuffleList } = this.state;
    const { question } = this.props;

    if (question) {
      return (
        <div>
          <span data-testid="question-category">{question.category}</span>
          <p data-testid="question-text">{question.question}</p>
          {shuffleList.map((answer, i) => (
            <Button
              test={ answer.testId }
              key={ i }
              name={ answer.answer }
              onClick={ this.handleClick }
              className="btn-answer"
            />
          ))}
        </div>
      );
    }

    return <div />;
  }
}

Card.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  score: PropTypes.func.isRequired,
};

export default Card;
