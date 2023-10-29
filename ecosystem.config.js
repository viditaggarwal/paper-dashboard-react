module.exports = {
    apps : [{
      name: 'server',  // Changed name to 'server' to match script filename
      script: 'server.js',
      exec_mode: 'fork',  // Changed to 'fork' for single instance
      instances: 1,  // Set to 1 for single instance
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      listen_timeout: 3000,
      kill_timeout: 3000,
      post_update: ["npm run build"],  // This will run every time you reload or restart
    }],
  };