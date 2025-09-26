export default function NavBar() {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 w-full h-24 bg-[#163928] shadow-md ">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          
          {/* Logo + Brand Name */}
          <div className="flex items-center space-x-3">
            <a href="/">
              <img
                src="./images/navBarLogo1.png"
                alt="Sangam Jewellers Logo"
                className="h-16 w-auto"
              />
            </a>
            <span className="text-4xl font-bold text-[#D3AF37]">Sangam Jewellers</span>
          </div>
  
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-6">
            <button className="rounded-lg bg-[#163928] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#163928]">
              Home
            </button>
            <button className="rounded-lg bg-[#163928] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#163928]">
              About
            </button>
            <button className="rounded-lg bg-[#163928] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#163928]">
              Collection
            </button>
            <button className="rounded-lg bg-[#163928] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#163928]">
              Contact
            </button>
            <button className="rounded-lg bg-[#163928] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#163928]">
              Login
            </button>
          </div>
        </div>
      </nav>
    );
  }
  