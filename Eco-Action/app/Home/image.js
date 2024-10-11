export function Image() {
    return (
      <div>
        <div
          className="h-screen bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: 'url(https://i.pinimg.com/564x/71/d3/66/71d366cee67cbe14aade82a35ca6b05b.jpg)',
          }}
        >
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
            <div className="w-2/3 text-center md:w-1/2">
              <h1 className="mb-4 text-3xl font-bold text-white sm:text-2xl md:text-4xl">
              Improve the Environment: Read Our Latest Article
              </h1>
              <p className="mb-8 text-sm text-white sm:text-base md:text-lg">
              Discover practical tips and insights on how to contribute to a sustainable future. Learn about eco-friendly practices that can make a significant impact.
              </p>
              <button className="mt-6 bg-[#116A7B] hover:bg-transparent hover:text-[#116A7B] border-2 border-[#116A7B] transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5"
              >
          Read Article
          </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  