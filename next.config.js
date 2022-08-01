/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ['res.cloudinary.com'],
  }
  
};

module.exports = {
  nextConfig,
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://anju3684:anju3684@cluster0.8qqva.mongodb.net/nextjs-ecommerce?retryWrites=true&w=majority",

    ACCESS_TOKEN_SECRET: "_6D-j^Vv.g5xGpgUtUe^Pu`4C~6rfsA-J.D-Ff.R^Q=+;7z7*",
    REFRESH_TOKEN_SECRET: "^S*+2:8V][.3bjjTK]%e.Hmg'UD}c3",
    // PAYPAL_CLIENT_ID: "YOUR_PAYPAL_CLIENT_ID",
    // CLOUD_UPDATE_PRESET: "YOUR_CLOUD_UPDATE_PRESET",
    // CLOUD_NAME: "YOUR_CLOUD_NAME",
    // CLOUD_API: "YOUR_CLOUD_API",
  },
};
