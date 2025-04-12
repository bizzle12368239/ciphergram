export default function ContactPage() {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <div className="max-w-xl mx-auto text-center">
          <p className="mb-4">Have questions, feedback, or a puzzle to solve? Drop us a message!</p>
          <a
            href="mailto:hello@biovitcreations.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Email us at hello@biovitcreations.com
          </a>
        </div>
      </main>
    );
  }

  