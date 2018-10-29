import { isFunction } from 'lodash/fp'

async function readAsDataURL(file, done) {
  const data = await new Promise((resolve) => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      resolve(reader.result)
    }, false)

    reader.readAsDataURL(file)
  })

  return isFunction(done) &&
    done(data)
}

export default readAsDataURL
