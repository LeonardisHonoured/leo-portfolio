// Starts the whole portfolio with one command:  npm run dev
// - back end  (Express API)  -> http://localhost:5000
// - front end (React + Vite) -> http://localhost:5173
// Stop both with Ctrl+C.

import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const targets = [
  { name: 'back end', dir: path.join(root, 'back end') },
  { name: 'front end', dir: path.join(root, 'front end') },
]

const children = []

function stopAll() {
  for (const child of children) {
    if (child.exitCode === null) {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' })
      } else {
        child.kill('SIGTERM')
      }
    }
  }
}

for (const { name, dir } of targets) {
  const child = spawn(npm, ['run', 'dev'], {
    cwd: dir,
    stdio: 'inherit',
    shell: true,
  })
  child.on('exit', () => {
    // If one server stops, stop the other too, then exit.
    if (children.every((c) => c.exitCode !== null)) {
      process.exit(0)
    }
    stopAll()
  })
  children.push(child)
}

process.on('SIGINT', () => {
  stopAll()
  setTimeout(() => process.exit(0), 300)
})
process.on('SIGTERM', () => {
  stopAll()
  setTimeout(() => process.exit(0), 300)
})

console.log('')
console.log('  Starting the portfolio...')
console.log('  Site: http://localhost:5173')
console.log('  API:  http://localhost:5000')
console.log('  Stop: Ctrl+C')
console.log('')
