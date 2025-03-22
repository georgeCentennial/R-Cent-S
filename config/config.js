
      const config = {
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
        mongoUri: process.env.MONGO_URI || 
                  "mongodb+srv://gueseivy:WebAppProject@rcents.yn2zp.mongodb.net/RCentS?retryWrites=true&w=majority&appName=RCentS"
      };
      
      export default config;
      
      
      