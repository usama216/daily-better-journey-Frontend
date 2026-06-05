export default function DailyQuote() {
  const quote =
    'What lies behind us and what lies before us are tiny matters compared to what lies within us.'

  return (
    <section className="relative z-10 bg-gradient-to-br from-forest-50 via-white to-forest-100 py-10 lg:py-32 overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-forest-100 border border-forest-300 rounded-full mb-4">
            <span className="text-forest-700 text-sm font-semibold uppercase tracking-wide">
              A Gentle Reminder
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900">
            Trust Your Becoming
          </h2>
        </div>

        <div className="group bg-white rounded-3xl p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl border-2 border-transparent hover:border-forest-200 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-50 via-white to-forest-50 opacity-80" />

          <div className="absolute top-4 left-4 text-9xl text-forest-200 font-serif leading-none select-none opacity-60">
            &ldquo;
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-charcoal-800 leading-relaxed italic text-center px-4">
              {quote}
            </p>

            <div className="mt-8 text-center">
              <p className="text-sm font-semibold text-forest-600 uppercase tracking-wider">
                Ralph Waldo Emerson
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-6 text-9xl text-forest-200 font-serif leading-none select-none opacity-60">
            &rdquo;
          </div>
        </div>
      </div>
    </section>
  )
}
