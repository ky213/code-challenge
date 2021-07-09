import request from 'supertest'
import app from '../src/app'

describe('POST /text', () => {
  test('should respond with a 201 status code', async () => {
    const response = await request(app)
      .post('/text')
      .send({
        ar: {
          title: 'اللوائح المالية 2021',
          content: 'هذا هو محتوى اللوائح المالية 2021',
        },
        fr: {
          title: 'lois des finance 2021',
          content: 'le tesxt de lois de finances 2021',
        },
        en: {
          title: 'Finances regulations 2021',
          content: 'this is the content of finances regulations 2021',
        },
      })
    expect(response.statusCode).toBe(201)
  })

  test('should respond with a 500 status code when body content is not valid', async () => {
    const response = await request(app).post('/text').send({})
    expect(response.statusCode).toBe(500)
  })
})

describe('GET /text', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/text').send()

    expect(response.statusCode).toBe(200)
  })
})

describe('GET /text/:textId', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app)
      .get('/text/60e7483e2f66b7eb5e714ac2')
      .send()

    expect(response.statusCode).toBe(200)
  })

  test('should respond with a 500 status code with wrong textId', async () => {
    const response = await request(app)
      .get('/text/60e7483e2f66b7eb5e999')
      .send()

    expect(response.statusCode).toBe(500)
  })
})

describe('GET /text/:textId/count', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app)
      .get('/text/60e7483e2f66b7eb5e714ac2/count')
      .send()

    expect(response.statusCode).toBe(200)
  })

  test('should respond with a number in the body', async () => {
    const response = await request(app)
      .get('/text/60e7483e2f66b7eb5e714ac2/count')
      .send()

    expect(response.body).not.toBeNaN()
  })
})

describe('GET /text/:textId/count/:language', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app)
      .get('/text/60e7483e2f66b7eb5e714ac2/count/ar')
      .send()

    expect(response.statusCode).toBe(200)
  })

  test('should respond with a number in the body', async () => {
    const response = await request(app)
      .get('/text/60e7483e2f66b7eb5e714ac2/count/ar')
      .send()

    expect(response.body).not.toBeNaN()
  })
})

describe('POST /text/search?q=', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).post('/text/search?q=').send()

    expect(response.statusCode).toBe(200)
  })
})

describe('GET /text/mostoccurrent', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/text/mostoccurrent').send()

    expect(response.statusCode).toBe(200)
  })
})
