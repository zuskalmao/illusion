import React from 'react'
import IllusionEffect from './IllusionEffect'

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Background Gradient (kept as is, but now behind the centered content) */}
      <div className="absolute inset-0 z-0">
        <div className="illusion-bg"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4">
        <nav className="flex justify-center space-x-6 md:space-x-12">
          <a
            href="#"
            className="text-lg md:text-xl font-semibold hover:text-purple-400 transition-colors duration-300"
          >
            twitter
          </a>
          <a
            href="#"
            className="text-lg md:text-xl font-semibold hover:text-blue-400 transition-colors duration-300"
          >
            telegram
          </a>
          <a
            href="#"
            className="text-lg md:text-xl font-semibold hover:text-green-400 transition-colors duration-300"
          >
            pump
          </a>
        </nav>
      </header>

      {/* Interactive Illusion Area */}
      <div className="relative z-10 w-full max-w-2xl aspect-square flex items-center justify-center">
        <IllusionEffect />
      </div>

      {/* Optional: Add content over the illusion */}
      {/* <div className="relative z-5 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Welcome</h1>
      </div> */}
    </div>
  )
}

export default App
