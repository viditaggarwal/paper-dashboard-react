module.exports = {
    apps : [{
      name: 'stocky',
      script: 'server.js',
      exec_mode: 'cluster',
      instances: 'max',
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