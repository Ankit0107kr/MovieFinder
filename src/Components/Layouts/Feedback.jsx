// src/pages/Feedback.jsx
import { useState } from 'react';

export default function Feedback() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can POST `text` and `rating` to your backend here
    console.log('Feedback Submitted:', { text, rating });
    setSubmitted(true);
    setText('');
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Give Us Your Feedback</h1>

        {submitted && (
          <div className="mb-4 text-green-400">Thanks for your feedback!</div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Your Message</label>
          <textarea
            className="w-full p-3 rounded-md text-black"
            rows="4"
            placeholder="Share your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>

          <label className="block mt-4 mb-2 text-sm font-medium">Rate Us</label>
          <div className="flex items-center space-x-2 text-yellow-400 text-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? 'text-yellow-400' : 'text-gray-600'}
              >
                ★
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md font-semibold"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
