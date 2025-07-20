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

const SNAKE_MAX = scenarios.length + 1; // +1 for the initial head
const SNAKE_COLORS = [
  'from-green-400 to-green-600',
  'from-lime-400 to-green-500',
  'from-emerald-400 to-green-600',
  'from-teal-400 to-emerald-500',
  'from-green-300 to-lime-500',
  'from-lime-300 to-green-400',
];

function ConfettiBurst() {
  // Simple emoji confetti burst
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      <div className="text-5xl animate-bounce-slow">🎉✨🥳🎊</div>
    </div>
  );
}

function App() {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [tries, setTries] = useState(0);
  const [snakeLength, setSnakeLength] = useState(1); // initial head
  const [animateGrow, setAnimateGrow] = useState(false);

  const current = scenarios[level];

  const handleSelect = (idx) => {
    if (showFeedback || completed) return;
    setSelected(idx);
    if (idx === current.correct) {
      setShowFeedback(true);
      setAnimateGrow(true);
      setTimeout(() => {
        setAnimateGrow(false);
        const newLength = snakeLength + 1;
        setSnakeLength(newLength);
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
    setSnakeLength(1);
  };

  // Render the snake as a row of blocks, with the finish line at the end
  const renderSnake = () => (
    <div className="flex items-end justify-center gap-1 mb-6 mt-2 relative min-h-[48px]">
      {Array.from({ length: SNAKE_MAX }).map((_, i) => {
        if (i === SNAKE_MAX - 1) {
          // Finish line
          return (
            <div
              key={i}
              className={`w-10 h-10 flex items-center justify-center rounded-md border-2 border-green-700 bg-gradient-to-t from-yellow-200 to-white text-2xl font-bold ml-2
                ${snakeLength === SNAKE_MAX ? 'animate-pulse' : ''}`}
            >
              🏁
            </div>
          );
        }
        if (i >= snakeLength) {
          // Empty path
          return (
            <div key={i} className="w-10 h-10 rounded-md border-2 border-gray-300 bg-white" />
          );
        }
        // Snake body
        const colorIdx = i % SNAKE_COLORS.length;
        return (
          <div
            key={i}
            className={`w-10 h-10 flex items-center justify-center rounded-md border-2 border-green-800 shadow-md
              bg-gradient-to-br ${SNAKE_COLORS[colorIdx]}
              ${i === 0 ? 'relative z-10 scale-110' : ''}
              ${animateGrow && i === snakeLength - 1 ? 'animate-grow' : ''}
              transition-all duration-300
            `}
            style={{ transition: 'transform 0.3s' }}
          >
            {i === 0 ? (
              <span className="text-2xl select-none">🐍<span className="absolute left-2 top-2 text-xs">👀</span></span>
            ) : ''}
          </div>
        );
      })}
      {/* Grass foreground */}
      <div className="absolute -bottom-2 left-0 w-full flex gap-1 z-0">
        {Array.from({ length: SNAKE_MAX + 2 }).map((_, i) => (
          <span key={i} className="text-green-700 text-lg select-none">🌱</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative max-w-md mx-auto mt-12 p-6 bg-gradient-to-br from-green-100 via-blue-50 to-green-200 rounded-2xl shadow-lg text-center font-sans min-h-[540px] flex flex-col justify-center overflow-hidden">
      {/* Jungle/grass background */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none">
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-green-200 via-blue-50 to-green-100 opacity-80" />
        <div className="absolute left-0 bottom-0 w-full flex justify-between px-2 pb-2 text-2xl opacity-60">
          <span>🌴</span>
          <span>🌳</span>
          <span>🌲</span>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-green-700 mb-2 drop-shadow">Data Defender: Snake Path</h1>
      {renderSnake()}
      {completed && <ConfettiBurst />}
      {completed ? (
        <div className="flex flex-col items-center mt-4 relative z-10">
          <div className="text-6xl mb-2 animate-bounce">🎉</div>
          <h2 className="text-xl font-bold text-green-700 mb-2">Your snake reached the finish line!</h2>
          <p className="text-lg text-gray-800 mb-4">You answered all the privacy questions and kept your data safe!</p>
          <button onClick={restart} className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition">Play Again</button>
        </div>
      ) : (
        <div className="relative z-10">
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
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-green-100 hover:border-green-400'}
                  ${showFeedback && selected !== idx ? 'opacity-60' : ''}
                `}
                onClick={() => handleSelect(idx)}
                disabled={showFeedback}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>
          <div className="min-h-[2.2em] text-green-800 font-medium mb-2 text-base">
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

// Tailwind custom animation for snake growth
// Add this to your tailwind.config.js:
// theme: { extend: { keyframes: { grow: { '0%': { transform: 'scale(0.2)' }, '100%': { transform: 'scale(1)' } } }, animation: { 'grow': 'grow 0.4s ease' } } }

export default App;
