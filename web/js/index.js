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

const fac = num => {
  let sum = 1
  while (num--) {
    sum *= num + 1
  }
  return sum
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
    size = Object.keys(stepsOption).length,
    steps
  while (routes.length !== fac(size) / (fac(2) * fac(size - 2))) {
    steps = stepsRandom('ABCD')
    if (!routes.includes(steps) && !currentRoutes.includes(steps))
      routes.push(steps)
  }

  return routes
}

const main = () => {
  let steps = 'ABCD',
    min = steps,
    i = 0,
    routes = null,
    output = '',
    btnst = '<button class="btn btn-primary mx-3 my-5" disabled ',
    btnsh = '<button class="btn btn-warning mx-3 my-5" disabled ',
    btnen = '</button>'

  output += `${btnsh}id="sh0">${min} <span class="badge badge-light">${stepsCount(
    min
  )}</span>${btnen}`

  while (1) {
    output += '<div>'

    routes = stepsGenerate(routes !== null ? routes : [min])
    routes.forEach(r => {
      if (stepsCount(r) < stepsCount(min)) min = r
    })

    routes.forEach(r => {
      i++
      output += `${
        r === min ? btnsh + 'id="sh' : btnst + 'id=el'
      }${i}">${r} <span class="badge badge-light">${stepsCount(
        r
      )}</span>${btnen}`
    })

    output += '</div>'

    if (stepsCount(min) >= stepsCount(steps)) break

    steps = min
  }

  $('#main').html(output)
}

main()
