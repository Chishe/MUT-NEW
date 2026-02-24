module.exports = {
  apps: [
    {
      name: "mut-web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "C:/Users/USER/Documents/MUT-NEW"
    },
    {
      name: "mut-nodered",
      script: "node-red",
      interpreter: "cmd.exe",
      interpreter_args: "/c"
    }
  ]
};