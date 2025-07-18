import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useTokenizeStore } from './tokenize'

interface Prompt {
  role: string
  content: string
}

interface useTextChatStore {
  text: Ref<string>
  question: Ref<string>
  prompt: Ref<Prompt[]>
  gptResponse: Ref<string>
  isLoading: Ref<boolean>
  error: Ref<string>
  history: Ref<{ question: string; response: string }[]>
  sendPrompt: () => Promise<void>
  createPrompt: () => void
  clearChat: () => void
  clearError: () => void
  clearHistory: () => void
  findExistingAnswer: (questionToCheck: string) => string | null
}

export const useTextChatStore = defineStore('textChat', (): useTextChatStore => {
  const tokenizeStore = useTokenizeStore()
  const text = ref('')
  const question = ref('')
  const prompt = ref<Prompt[]>([])
  const gptResponse = ref('')
  const isLoading = ref(false)
  const error = ref('')
  const history = ref<{ question: string; response: string }[]>([])

  const createPrompt = () => {
    const instructions = {
      role: 'system',
      content:
        'You are a helpful assistant that can answer questions only about the following text:',
    }
    const textToAnalyze = { role: 'user', content: text.value }
    const chatQuestion = { role: 'user', content: question.value }

    prompt.value = [instructions, textToAnalyze, chatQuestion]

    tokenizeStore.tokenize(prompt.value)
  }

  const sendPrompt = async () => {
    error.value = ''

    if (!text.value.trim() || !question.value.trim()) {
      error.value = 'Please enter both text and a question'
      return
    }

    // Check if this question already exists in history
    const existingAnswer = findExistingAnswer(question.value)
    if (existingAnswer) {
      // Move existing answer to the end of history (most recent)
      const questionToMove = question.value.trim()
      history.value = history.value.filter(
        (item) => item.question.trim().toLowerCase() !== questionToMove.toLowerCase(),
      )
      history.value.push({ question: questionToMove, response: existingAnswer })
      question.value = ''
      return
    }

    isLoading.value = true
    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        messages: prompt.value,
      })

      if (!response.data?.message) {
        throw new Error('Invalid response from server')
      }

      gptResponse.value = response.data.message
      history.value.push({ question: question.value, response: response.data.message })
      question.value = ''
    } catch (err) {
      console.error('Error sending prompt:', err)

      error.value = 'Failed to get response. Please try again.'
    } finally {
      isLoading.value = false
      gptResponse.value = ''
    }
  }

  const clearChat = () => {
    text.value = ''
    question.value = ''
    prompt.value = []
    gptResponse.value = ''
    isLoading.value = false
    error.value = ''
    history.value = []
  }

  const clearError = () => {
    error.value = ''
  }

  const clearHistory = () => {
    history.value = []
  }

  const findExistingAnswer = (questionToCheck: string): string | null => {
    const normalizedQuestion = questionToCheck.trim().toLowerCase()
    const existing = history.value.find(
      (item) => item.question.trim().toLowerCase() === normalizedQuestion,
    )
    return existing ? existing.response : null
  }

  return {
    text,
    question,
    prompt,
    gptResponse,
    history,
    isLoading,
    error,
    sendPrompt,
    createPrompt,
    clearChat,
    clearError,
    clearHistory,
    findExistingAnswer,
  }
})
