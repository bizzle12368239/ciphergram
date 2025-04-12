export default function FAQPage() {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-xl font-semibold">How do I play the games?</h2>
            <p>Each Ciphergram game comes with clear instructions and clues. Just gather your group, set the mood, and dive in.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Can I play solo?</h2>
            <p>Yes — all games can be played solo or with friends.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Are the games replayable?</h2>
            <p>Most games are designed for one-time play, but they’re great for passing on to a friend.</p>
          </div>
        </div>
      </main>
    );
  }
  