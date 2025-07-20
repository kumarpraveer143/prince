import { useState } from 'react';

const scenarios = [
  {
    text: 'You receive an email from an unknown sender with a link saying you won a prize. What do you do?',
    correct: 'Secure',
    explanation: 'Correct! Never click suspicious links from unknown sources. It could be a phishing attempt.'
  },
  {
    text: 'You set your password as "123456" for your social media account.',
    correct: 'Secure',
    explanation: 'Correct! Always use strong, unique passwords. "123456" is very easy to guess.'
  },
  {
    text: 'A stranger sends you a friend request on social media. You accept it.',
    correct: 'Secure',
    explanation: 'Correct! Only accept friend requests from people you know and trust.'
  },
  {
    text: 'You use public Wi-Fi at a café to log in to your banking app.',
    correct: 'Secure',
    explanation: 'Correct! Avoid accessing sensitive accounts on public Wi-Fi. It can be insecure.'
  },
  {
    text: 'You share your home address in a gaming chat with new online friends.',
    correct: 'Secure',
    explanation: 'Correct! Never share personal information in public or gaming chats.'
  }
];

const surrenderExplanations = [
  'Incorrect. Clicking unknown links can lead to scams or malware.',
  'Incorrect. Weak passwords are easy for hackers to guess.',
  'Incorrect. Accepting strangers can expose you to risks.',
  'Incorrect. Public Wi-Fi is not safe for sensitive transactions.',
  'Incorrect. Sharing personal info online can be dangerous.'
];

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleChoice = (choice) => {
    if (showFeedback || gameOver) return;
    const scenario = scenarios[current];
    let isCorrect = false;
    let feedbackMsg = '';
    if (
      (choice === 'Secure' && scenario.correct === 'Secure') ||
      (choice === 'Surrender' && scenario.correct === 'Surrender')
    ) {
      isCorrect = true;
      setScore(score + 1);
      feedbackMsg = scenario.explanation;
    } else {
      feedbackMsg = surrenderExplanations[current];
    }
    setFeedback(feedbackMsg);
    setShowFeedback(true);
    setTimeout(() => {
      if (current === scenarios.length - 1) {
        setGameOver(true);
      } else {
        setCurrent(current + 1);
        setShowFeedback(false);
        setFeedback('');
      }
    }, 1800);
  };

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setShowFeedback(false);
    setFeedback('');
    setGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-blue-50 rounded-2xl shadow-lg text-center font-sans">
      <h1 className="text-3xl font-bold text-blue-600 mb-1">SOS: Secure or Surrender</h1>
      <h2 className="text-lg text-gray-700 mb-6 font-medium">Data Defender Challenge</h2>
      {gameOver ? (
        <div className="bg-yellow-50 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-orange-700 mb-2">Game Over!</h3>
          <p className="text-lg font-medium mb-1">Your score: <span className="text-blue-700">{score} / {scenarios.length}</span></p>
          <p className="mb-4 text-gray-800">{score >= 4 ? 'Great job! You know how to stay safe online.' : 'Keep learning! Online safety is important.'}</p>
          <button
            onClick={restartGame}
            className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-blue-100 rounded-lg p-4 mb-4 text-base text-gray-900">
            <p><b>Scenario {current + 1}:</b> {scenarios[current].text}</p>
          </div>
          <div className="flex justify-center gap-6 mb-3">
            <button
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => handleChoice('Secure')}
              disabled={showFeedback}
            >
              ✅ Secure
            </button>
            <button
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => handleChoice('Surrender')}
              disabled={showFeedback}
            >
              ❌ Surrender
            </button>
          </div>
          <div className="min-h-[2.2em] text-blue-800 font-medium mb-2 text-base">
            {showFeedback && <p>{feedback}</p>}
          </div>
          <div className="text-gray-700 text-base">
            <p>Score: <span className="font-semibold">{score}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
