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

  test('should respond with a 400 status code when body content is not valid', async () => {
    const response = await request(app).post('/text').send({})
    expect(response.statusCode).toBe(400)
  })
})
