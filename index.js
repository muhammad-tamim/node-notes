const arg = process.argv;

const name = arg[2]
const age = arg[3]

console.log(arg)
console.log(name, age)

/*
process.arg[0] = node path
process.arg[1] = file path
process.arg[2] = first actual input value

[
  '/home/muhammad-tamim/.nvm/versions/node/v24.4.1/bin/node',
  '/home/muhammad-tamim/programming/notes/node-notes/index.js',
  'tamim',
  '20'
]
*/