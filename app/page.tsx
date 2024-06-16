import Head from "next/head";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>My Horoscope Bot</title>
        <meta name="description" content="Horoscope Telegram Bot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-lg mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Welcome to My Horoscope Bot
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Get your daily horoscope readings directly in your Telegram chat!
            </p>
            <p className="text-lg md:text-xl">
              <strong>How to use:</strong> Select your zodiac sign and choose
              the day (today, tomorrow, or day after tomorrow) to receive your
              horoscope.
            </p>
          </div>
          <img
            className="hidden md:block max-w-lg"
            src="/horoscope-telegram-bot.png"
            alt="Horoscope Bot"
          />
        </div>
      </section>

      {/* Features section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Daily Horoscope
              </h3>
              <p className="text-lg">
                Receive accurate daily horoscope predictions based on your
                zodiac sign.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Easy to Use
              </h3>
              <p className="text-lg">
                Simple commands allow you to get horoscopes effortlessly
                directly in your Telegram chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to use section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Step 1: Select Your Zodiac Sign
              </h3>
              <p className="text-lg">
                Start by selecting your zodiac sign using one of the available
                commands.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Step 2: Choose the Day
              </h3>
              <p className="text-lg">
                After selecting your sign, choose from options like "today,"
                "tomorrow," or "day after tomorrow" to get the horoscope for
                that day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start Using My Horoscope Bot Today!
          </h2>
          <p className="text-lg">
            Join thousands of users who are already enjoying daily horoscope
            readings.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="container mx-auto">
          <p>&copy; 2024 My Horoscope Bot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
