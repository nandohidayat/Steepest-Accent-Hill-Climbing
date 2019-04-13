const routes = {
  A: {
    B: 8,
    C: 3,
    D: 7
  },
  B: {
    A: 8,
    C: 5,
    D: 4
  },
  C: {
    A: 3,
    B: 5,
    D: 6
  },
  D: {
    A: 7,
    B: 4,
    C: 6
  }
}

const stepCount = steps => {
  let sum = 0,
    i = steps.length - 1

  steps = steps.split('')

  while (i--) {
    sum += routes[steps[i]][steps[i + 1]]
  }

  return sum
}

const stepRandom = steps => {
  let i = steps.length,
    j,
    temp

  steps = steps.split('')

  while (i--) {
    j = Math.floor(Math.random() * i)
    temp = steps[i]
    steps[i] = steps[j]
    steps[j] = temp
  }

  return steps.join('')
}

const stepGenerate = () => {}

console.log(stepCount('ABCD'))
console.log(stepRandom('ABCD'))
