import express from 'express'
import { encodeChat } from 'gpt-tokenizer'

const router = express.Router()

router.post('/', async function (req, res, next) {
  try {
    const { chat } = req.body

    if (!chat) {
      return res.status(400).send({
        error: 'Text is required',
        message: 'Please provide a text field in the request body',
      })
    }

    const tokens = encodeChat(chat, 'gpt-4o-mini')

    res.status(200).send({
      tokenCount: tokens.length,
    })
  } catch (error) {
    console.error('Tokenization error:', error)
    res.status(500).send({
      error: 'Internal server error',
      message: 'Failed to tokenize text',
    })
  }
})

export default router
