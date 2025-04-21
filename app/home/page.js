'use client';

export default function Home() {
  return (
    <>
      {/* Import Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
      `}</style>

      {/* CSS animation */}
      <style jsx>{`
        .background {
          background-image: url('/The Main Gate.jpg'); /* Updated background to jpg */
          background-size: cover;
          background-position: center;
          animation: zoomBackground 30s ease-in-out infinite; /* Increased duration to 30s */
          height: 100vh;
        }

        @keyframes zoomBackground {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1); /* Slightly increased scale for more noticeable effect */
          }
          100% {
            transform: scale(1);
          }
        }

        /* Logo Styles */
        .logo {
          width: 15%; /* Adjust the logo size */
          margin: 0 auto;
          display: block;
          padding-top: 25vh; /* Adjusted padding for better positioning */
        }

        /* Subheading Styles */
        .subheading-container {
          background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
          padding: 10px 20px;
          border-radius: 5px; /* Rounded corners */
          margin-top: 2rem;
      
          width: 100%; /* Full width */
        }

        .subheading {
          font-family: 'Cinzel', serif;
          text-align: center;
          font-size: 1.5rem;
          color: #fff; /* White text for contrast */
        }

        /* Card Styles */
        .card-container {
          display: flex;
          justify-content: space-around;
          margin-top: 5%;
        }

        .game-card {
          background-color: rgba(0, 0, 0, 0.8);
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          width: 45%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .game-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
        }

        .game-title {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: bold;
          color: #fff;
          margin-bottom: 15px;
        }

        .game-description {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 20px;
        }

        .button {
          font-family: 'Cinzel', serif;
          padding: 10px 20px;
          font-size: 0.8rem;
          border: 2px solid #f5a623;
          border-radius: 8px;
          background-color: transparent;
          color: #f5a623;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .button:hover {
          background-color: #f5a623;
          color: white;
        }

        /* Footer Styles */
        .footer {
          text-align: center;
          color: #fff;
          margin-top: 50px;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="background">
        {/* Logo instead of "Welcome to Ciphergram" text */}
        <img
          src="/Ciphergram logo blue background.png" 
          alt="Ciphergram Logo"
          className="logo"
        />

        {/* Subheading with background effect */}
        <div className="subheading-container">
          <p className="subheading">At-home escape game puzzles</p>
        </div>

        {/* Game Cards Section */}
        <div className="card-container">
          {/* Escape from Ironwood */}
          <div className="game-card">
            <h2 className="game-title">Escape From Ironwood</h2>
            <p className="game-description">
              A thrilling escape room puzzle you can play from the comfort of your home. Solve mysteries, crack codes, and unlock the secrets of Ironwood.
            </p>
            <button className="button">Coming Soon</button>
          </div>

          {/* The Midnight Vault Heist */}
          <div className="game-card">
            <h2 className="game-title">The Midnight Vault Heist</h2>
            <p className="game-description">
              A highly anticipated puzzle game set in a high-security vault. Will you be able to break in and escape without triggering the alarm?
            </p>
            <button className="button">Coming Soon</button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>&copy; 2025 Ciphergram. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
