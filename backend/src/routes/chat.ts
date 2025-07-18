import express from 'express'
import client from '../config/openai.js'

const router = express.Router()

router.post('/', async function (req, res, next) {
  const { messages } = req.body
  // console.log(messages)
  try {
    if (messages.length === 0) {
      res.status(400).send({ error: 'No messages provided' })
      return
    }
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    })
    res.send({ message: response.choices[0].message.content })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to process request' })
  }
})

export default router
