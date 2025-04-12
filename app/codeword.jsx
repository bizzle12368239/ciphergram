import { useState } from "react";

export default function CodewordPage() {
  const correctCode = "cipher";
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [openHint, setOpenHint] = useState(null);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === correctCode) {
      alert("Correct! Moving on...");
      // Add routing or logic for success
    } else {
      setError("Incorrect codeword. Try again.");
      setGuessCount((prev) => prev + 1);
    }
  };

  const toggleHint = (hintNumber) => {
    setOpenHint((prev) => (prev === hintNumber ? null : hintNumber));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Hints */}
        {[1, 2, 3].map((num) => (
          <div key={num} className="mb-4 border border-gray-700 rounded overflow-hidden">
            <button
              className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 flex justify-between items-center"
              onClick={() => toggleHint(num)}
            >
              <span>Hint {num}</span>
              <span>{openHint === num ? "–" : "+"}</span>
            </button>
            {openHint === num && (
              <div className="px-4 py-3 bg-gray-800 text-sm text-left">
                Placeholder text for Hint {num}.
              </div>
            )}
          </div>
        ))}

        {/* Code Input */}
        <input
          type="text"
          className="w-full px-4 py-2 mb-3 rounded bg-gray-800 border border-gray-600 focus:outline-none text-white"
          placeholder="Enter codeword..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
        />

        <button
          className="w-full py-2 mb-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
        <p className="text-gray-400 text-xs">Incorrect guesses: {guessCount}</p>
      </div>
    </div>
  );
}
