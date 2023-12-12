/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    CAN_CALL_API: process.env.CAN_CALL_API,
  }
}


module.exports = nextConfig
