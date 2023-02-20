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
    BASE_URL: "https://nextjs-ecommerce-jc5r0m58r-anju3684.vercel.app/",
    MONGODB_URL:
      "mongodb+srv://anju3684:anju3684@cluster0.8qqva.mongodb.net/nextjs-ecommerce?retryWrites=true&w=majority",

    ACCESS_TOKEN_SECRET: "_6D-j^Vv.g5xGpgUtUe^Pu`4C~6rfsA-J.D-Ff.R^Q=+;7z7*",
    REFRESH_TOKEN_SECRET: "^S*+2:8V][.3bjjTK]%e.Hmg'UD}c3",
    PAYPAL_CLIENT_ID: "AVIAv40OqVg7v1wLtV5YTzkm2FMfp-rq9VzrkMx7TaCzJBXq9G0dUcT-rZD3H-jSsFLmxx0h5Xufkxdc",
    CLOUD_UPDATE_PRESET: "nextjs_store",
    CLOUD_NAME: "dwecr1akj",
     CLOUD_API: "https://api.cloudinary.com/v1_1/dwecr1akj/image/upload",
     API_KEY:"192156415937586",
     APT_SECRET:"RqF2mibAWfDHM1OH_vxEeM4QWKU",
  },
};
//sb-jzj0x19770176@personal.example.com

//asdf1234
//https://nextjs-ecommerce-two-nu.vercel.app