const stepsOption = {
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

const stepsCount = steps => {
  let sum = 0,
    i = steps.length - 1

  while (i--) {
    sum += stepsOption[steps[i]][steps[i + 1]]
  }

  return sum
}

const stepsRandom = steps => {
  let i = steps.length,
    j,
    temp

  steps = steps.split('')

  while (i--) {
    j = Math.floor(Math.random() * (i + 1))
    temp = steps[i]
    steps[i] = steps[j]
    steps[j] = temp
  }

  return steps.join('')
}

const stepsGenerate = currentRoutes => {
  let routes = [],
    steps

  while (routes.length !== 6) {
    steps = stepsRandom('ABCD')
    if (!routes.includes(steps) && !currentRoutes.includes(steps))
      routes.push(steps)
  }

  return routes
}

const main = () => {
  let steps = 'ABCD',
    min = steps

  while (1) {
    console.log(`\ncurrent state = ${steps} [${stepsCount(steps)}]`)

    console.log(`next steps = `)
    routes = stepsGenerate([steps])
    routes.forEach(r => {
      console.log(` ${r} [${stepsCount(r)}]`)
      if (stepsCount(r) < stepsCount(min)) min = r
    })

    if (stepsCount(min) >= stepsCount(steps)) break

    steps = min
  }

  console.log('\nroutes search end')
}

main()
