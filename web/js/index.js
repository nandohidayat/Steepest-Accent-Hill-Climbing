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
    min = steps,
    output = '',
    btnst = '<button class="btn btn-primary mx-3 my-5" disabled>',
    btnsh = '<button class="btn btn-warning mx-3 my-5" disabled>',
    btnen = '</button>'

  output += `${btnsh}${min} <span class="badge badge-light">${stepsCount(
    min
  )}</span>${btnen}`

  while (1) {
    output += '<div>'

    routes = stepsGenerate([steps])
    routes.forEach(r => {
      if (stepsCount(r) < stepsCount(steps)) min = r
    })

    routes.forEach(r => {
      output += `${
        r === min ? btnsh : btnst
      }${r} <span class="badge badge-light">${stepsCount(r)}</span>${btnen}`
    })

    if (stepsCount(min) >= stepsCount(steps)) break

    steps = min

    output += '</div>'
  }

  $('#main').html(output)
}

main()
