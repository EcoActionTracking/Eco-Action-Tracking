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
    domains: [
      "fakestoreapi.com",
      "i.pinimg.com",
      "firebasestorage.googleapis.com",
      "media.giphy.com",
      "arka360.com",
      "encrypted-tbn0.gstatic.com",
      "www.eurokidsindia.com", // Previously added domain
      "honesthome.in", // Add this line for the new domain
      "i0.wp.com",
      "other-allowed-domain.com",
      "cdn.shopify.com",
      "lemonnier.es",
      "shutterstock.com",
    ],
  },
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
};

export default nextConfig;
