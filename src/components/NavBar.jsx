export default function NavBar() {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 w-full h-24 bg-[#1e3532] shadow-md ">
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
            <div className="text-[#D3AF37]">
              <div className="text-xl md:text-2xl font-serif font-semibold leading-tight">SANGAM</div>
              <div className="text-xl md:text-2xl font-serif font-semibold -mt-1">JEWELLERS</div>
            </div>
          </div>
  
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-6">
            <button className="rounded-lg bg-[#1e3532] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#1e3532]">
              Home
            </button>
            <button className="rounded-lg bg-[#1e3532] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#1e3532]">
              About
            </button>
            <button className="rounded-lg bg-[#1e3532] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#1e3532]">
              Collection
            </button>
            <button className="rounded-lg bg-[#1e3532] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#1e3532]">
              Contact
            </button>
            <button className="rounded-lg bg-[#1e3532] px-6 py-2 text-[#D3AF37] shadow-lg transition-shadow duration-300 hover:bg-[#1e3532]">
              Login
            </button>
          </div>
        </div>
      </nav>
    );
  }
  