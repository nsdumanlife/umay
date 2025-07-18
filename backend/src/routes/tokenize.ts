import express from 'express'
import { encode } from 'gpt-tokenizer'

const router = express.Router()

// POST endpoint to encode strings
router.post('/', async function (req, res, next) {
  try {
    const { stringToTokenize } = req.body

    if (!stringToTokenize) {
      return res.status(400).send({
        error: 'Text is required',
        message: 'Please provide a text field in the request body',
      })
    }

    const tokens = encode(stringToTokenize)

    console.log(tokens, tokens.length)

    res.status(200).send({
      tokens: Array.from(tokens),
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
