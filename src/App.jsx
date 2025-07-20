import { useState } from 'react';

const scenarios = [
  {
    scenario: 'You get a message: "Click this link to win a free phone!" What should you do?',
    options: [
      'Click the link and enter your info',
      'Ignore the message and tell a trusted adult',
      'Share the link with your friends'
    ],
    correct: 1,
    explanation: 'Never click suspicious links or share personal info. Always check with a trusted adult!'
  },
  {
    scenario: 'Which is the safest password?',
    options: [
      'password123',
      'Your pet’s name',
      'A long password with letters, numbers, and symbols'
    ],
    correct: 2,
    explanation: 'Strong passwords keep your data safe!'
  },
  {
    scenario: 'A new app wants access to your photos, contacts, and location. What should you do?',
    options: [
      'Allow all permissions without checking',
      'Check why the app needs them and only allow what’s needed',
      'Give permissions because it looks fun'
    ],
    correct: 1,
    explanation: 'Only give apps the permissions they really need.'
  },
  {
    scenario: 'A stranger in a game chat asks for your real name and address. What do you do?',
    options: [
      'Share your info to make a new friend',
      'Keep your info private and don’t respond',
      'Ask them for their info first'
    ],
    correct: 1,
    explanation: 'Never share personal info online, even if someone seems friendly.'
  },
  {
    scenario: 'Your friend wants to post a funny photo of you online. What’s the best response?',
    options: [
      'Let them post it without asking',
      'Ask them not to post it if you’re uncomfortable',
      'Post it yourself so you have control'
    ],
    correct: 1,
    explanation: 'It’s okay to say no if you don’t want something shared.'
  }
];

const PATH_LENGTH = scenarios.length + 1; // +1 for start position

function App() {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [tries, setTries] = useState(0);
  const [position, setPosition] = useState(0); // character position on path

  const current = scenarios[level];

  const handleSelect = (idx) => {
    if (showFeedback || completed) return;
    setSelected(idx);
    if (idx === current.correct) {
      setShowFeedback(true);
      setTimeout(() => {
        setPosition(position + 1);
        if (level === scenarios.length - 1) {
          setCompleted(true);
        } else {
          setLevel(level + 1);
          setSelected(null);
          setShowFeedback(false);
          setTries(0);
        }
      }, 1000);
    } else {
      setTries(tries + 1);
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 1400);
    }
  };

  const restart = () => {
    setLevel(0);
    setSelected(null);
    setShowFeedback(false);
    setCompleted(false);
    setTries(0);
    setPosition(0);
  };

  // Render the path as a row of cells, with the character and finish line
  const renderPath = () => (
    <div className="flex items-center justify-center gap-2 mb-6 mt-2">
      {Array.from({ length: PATH_LENGTH }).map((_, i) => (
        <div
          key={i}
          className={`w-10 h-10 flex items-center justify-center rounded-full border-2
            ${i === position ? 'bg-yellow-200 border-yellow-400 shadow-lg scale-110' : 'bg-white border-gray-300'}
            ${i === PATH_LENGTH - 1 ? 'border-green-500' : ''}
            transition-all duration-300
          `}
        >
          {i === position ? '🧑\u200d💻' : i === PATH_LENGTH - 1 ? '🏁' : ''}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg text-center font-sans min-h-[500px] flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">Data Defender: Privacy Path</h1>
      {renderPath()}
      {completed ? (
        <div className="flex flex-col items-center mt-4">
          <div className="text-6xl mb-2">🎉</div>
          <h2 className="text-xl font-bold text-green-700 mb-2">You reached the finish line!</h2>
          <p className="text-lg text-gray-800 mb-4">You answered all the privacy questions and kept your data safe!</p>
          <button onClick={restart} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">Play Again</button>
        </div>
      ) : (
        <div>
          <div className="bg-white/80 rounded-lg p-3 text-base text-gray-900 shadow mb-4">
            <p>{current.scenario}</p>
          </div>
          <div className="flex flex-col gap-3 mb-3">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-lg font-semibold text-base border transition-all
                  ${selected === idx
                    ? idx === current.correct
                      ? 'bg-green-500 text-white border-green-600 scale-105'
                      : 'bg-red-500 text-white border-red-600 scale-105'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-400'}
                  ${showFeedback && selected !== idx ? 'opacity-60' : ''}
                `}
                onClick={() => handleSelect(idx)}
                disabled={showFeedback}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>
          <div className="min-h-[2.2em] text-blue-800 font-medium mb-2 text-base">
            {showFeedback && (
              selected === current.correct
                ? <span>Correct! 🎯</span>
                : <span>{current.explanation}</span>
            )}
          </div>
          <div className="text-gray-700 text-base mb-1">
            <p>Question: <span className="font-semibold">{level + 1}</span> / {scenarios.length}</p>
            {tries > 0 && selected !== current.correct && (
              <p className="text-sm text-red-500">Try again!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
