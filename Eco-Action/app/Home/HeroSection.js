export default function HeroSection(){


    return(
        <div className="max-w-6xl mx-auto font-sans max-md:max-w-md">
  <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
    <div className="relative z-50 max-md:order-1 max-md:text-center">
      <h2 className="text-gray-800 lg:text-6xl md:text-5xl text-3xl font-extrabold mb-4 md:!leading-[56px]">
        <span className="text-[#116A7B]">
        Transforming
        </span>
        {' '}Excess Food into{' '}
        <span className="text-[#116A7B]">
        Sustainable
        </span>
        {' '}Compost
      </h2>
      <p className="mt-6 text-base leading-relaxed text-gray-600">
      Join us in reducing food waste while nourishing the earth. Your contributions will not only help the environment but also earn you rewards for every compostable item you donate.      </p>
      <button
        className="mt-6 bg-[#116A7B] hover:bg-transparent hover:text-[#116A7B] border-2 border-[#116A7B] transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5"
        type="button"
      >
        Join the Movement
      </button>
      <div className="mt-12">
        <div className="grid items-center gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <h5 className="mb-2 text-xl font-bold text-gray-800">
              10+
            </h5>
            <p className="text-gray-600">
              Years Experience
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h5 className="mb-2 text-xl font-bold text-gray-800">
              890
            </h5>
            <p className="text-gray-600">
              Cases Solved
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h5 className="mb-2 text-xl font-bold text-gray-800">
              250
            </h5>
            <p className="text-gray-600">
              Business Partners
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="lg:h-[550px] md:h-[550px] flex items-center relative max-md:before:hidden before:absolute before:bg-[#116A7B] before:h-[120%] before:w-[120%] before:right-0 before:z-0">
      <img
        alt="Dining Experience"
        className="relative z-50 rounded-md lg:w-4/5"
        src="https://mcfp.jo/Content/articles/2020/11/25/How%20do%20I%20make%20organic%20fertilizer%20with%20yeast_550x350.jpeg"
      />
    </div>
  </div>
  <div className="relative z-50 grid gap-4 mb-12 md:grid-cols-3 md:px-4 max-md:mt-12">
    <div className="p-6 bg-white rounded-md shadow">
      <svg
        className="inline-block p-3 mb-4 bg-[#C2DEDC] rounded-md w-11 h-11"
        fill="currentColor"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z"
          data-original="#000000"
        />
        <path
          d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"
          data-original="#000000"
        />
      </svg>
      <h3 className="mb-2 text-xl font-bold text-gray-800">
        Customization
      </h3>
      <p className="text-sm text-gray-600">
        Tailor our product to suit your needs.
      </p>
      <a
        className="inline-block mt-4 text-sm font-bold text-[#116A7B] hover:underline"
        href="javascript:void(0);"
      >
        Learn more
      </a>
    </div>
    <div className="p-6 bg-white rounded-md shadow">
      <svg
        className="inline-block p-3 mb-4 bg-[#C2DEDC] rounded-md w-11 h-11"
        fill="currentColor"
        viewBox="0 0 512.001 512.001"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z"
          data-original="#000000"
        />
      </svg>
      <h3 className="mb-2 text-xl font-bold text-gray-800">
        Support
      </h3>
      <p className="text-sm text-gray-600">
        24/7 customer support for all your inquiries.
      </p>
      <a
        className="inline-block mt-4 text-sm font-bold text-[#116A7B] hover:underline"
        href="javascript:void(0);"
      >
        Learn more
      </a>
    </div>
    <div className="p-6 bg-white rounded-md shadow">
      <svg
        className="inline-block p-3 mb-4 bg-[#C2DEDC] rounded-md w-11 h-11"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          clipRule="evenodd"
          fillRule="evenodd"
        >
          <path
            d="M17.03 8.97a.75.75 0 0 1 0 1.06l-4.2 4.2a.75.75 0 0 1-1.154-.114l-1.093-1.639L8.03 15.03a.75.75 0 0 1-1.06-1.06l3.2-3.2a.75.75 0 0 1 1.154.114l1.093 1.639L15.97 8.97a.75.75 0 0 1 1.06 0z"
            data-original="#000000"
          />
          <path
            d="M13.75 9.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-1.25H14.5a.75.75 0 0 1-.75-.75z"
            data-original="#000000"
          />
          <path
            d="M3.095 3.095C4.429 1.76 6.426 1.25 9 1.25h6c2.574 0 4.57.51 5.905 1.845C22.24 4.429 22.75 6.426 22.75 9v6c0 2.574-.51 4.57-1.845 5.905C19.571 22.24 17.574 22.75 15 22.75H9c-2.574 0-4.57-.51-5.905-1.845C1.76 19.571 1.25 17.574 1.25 15V9c0-2.574.51-4.57 1.845-5.905zm1.06 1.06C3.24 5.071 2.75 6.574 2.75 9v6c0 2.426.49 3.93 1.405 4.845.916.915 2.419 1.405 4.845 1.405h6c2.426 0 3.93-.49 4.845-1.405.915-.916 1.405-2.419 1.405-4.845V9c0-2.426-.49-3.93-1.405-4.845C18.929 3.24 17.426 2.75 15 2.75H9c-2.426 0-3.93.49-4.845 1.405z"
            data-original="#000000"
          />
        </g>
      </svg>
      <h3 className="mb-2 text-xl font-bold text-gray-800">
        Performance
      </h3>
      <p className="text-sm text-gray-600">
        Experience blazing-fast performance with our product.
      </p>
      <a
        className="inline-block mt-4 text-sm font-bold text-[#116A7B] hover:underline"
        href="javascript:void(0);"
      >
        Learn more
      </a>
    </div>
  </div>

</div>
    );
}