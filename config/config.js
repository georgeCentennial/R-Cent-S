import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://sahar:sahar1234@cluster0.sfmanre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
};

export default config;
