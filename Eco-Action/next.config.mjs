// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['fakestoreapi.com'],
//     },
//   };

//   export default nextConfig;
///////

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    domains: ["fakestoreapi.com"],
  },
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
};

export default nextConfig;

