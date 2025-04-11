const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGO_URI ||  
  //"mongodb+srv://maamvie:ice482611@cluster0.gpveiof.mongodb.net/Skeleton?retryWrites=true&w=majority&appName=Cluster0"
  "mongodb+srv://vieguese:ice264811@cluster0.msktkcg.mongodb.net/RCentS?retryWrites=true&w=majority&appName=Cluster0"
};

export default config;


