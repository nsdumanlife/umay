import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenizeStore = defineStore('tokenize', () => {
  const tokens = ref(0)

  async function tokenize(chat: { role: string; content: string }[]) {
    try {
      const response = await axios.post('http://localhost:3000/api/tokenize', {
        chat,
      })
      tokens.value = response.data.tokenCount
    } catch (error) {
      console.error('Error tokenizing:', error)
      tokens.value = 0
    }
  }

  return { tokens, tokenize }
})
