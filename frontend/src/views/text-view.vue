<script setup lang="ts">
import { useTextChatStore } from '@/stores/text-chat'
import { useTokenizeStore } from '@/stores/tokenize'
import { ref, watch } from 'vue'

const textChatStore = useTextChatStore()
const tokenizeStore = useTokenizeStore()
const showHistoryNotice = ref(false)

const sendQuestion = () => {
  textChatStore.clearError()

  textChatStore.text = textChatStore.text.trim()
  textChatStore.question = textChatStore.question.trim()

  // Check if answer exists in history before sending
  const existingAnswer = textChatStore.findExistingAnswer(textChatStore.question)

  textChatStore.createPrompt()

  if (existingAnswer) {
    // Show history notice briefly
    showHistoryNotice.value = true
    setTimeout(() => {
      showHistoryNotice.value = false
    }, 3000)
  }

  textChatStore.sendPrompt()
}

const clearChat = () => {
  textChatStore.clearChat()
}

watch(
  () => textChatStore.text,
  (newText, oldText) => {
    // Clear history when text changes, but not on initial load
    if (oldText !== undefined && newText !== oldText) {
      textChatStore.clearHistory()
    }
  },
)
</script>

<template>
  <v-container fluid class="text-view-container">
    <div class="text-container">
      <h2>Enter the text you would like to ask questions about</h2>
      <v-textarea
        variant="outlined"
        v-model="textChatStore.text"
        label="Text"
        rows="8"
        :error-messages="
          !textChatStore.text.trim() && textChatStore.error ? ['Text is required'] : []
        "
        @input="textChatStore.clearError"
      />
      <div class="token-count">
        <p>Tokens: {{ tokenizeStore.tokens }}</p>
      </div>
    </div>
    <div class="question-container">
      <h2>Enter your question</h2>
      <div class="question-input-container">
        <v-text-field
          variant="outlined"
          v-model="textChatStore.question"
          label="Question"
          :error-messages="
            !textChatStore.question.trim() && textChatStore.error ? ['Question is required'] : []
          "
          @input="textChatStore.clearError"
          @keyup.enter="sendQuestion"
        />
        <v-btn
          class="submit-btn"
          @click="sendQuestion()"
          :disabled="textChatStore.isLoading"
          color="primary"
        >
          {{ textChatStore.isLoading ? 'Thinking...' : 'Submit' }}
        </v-btn>
      </div>

      <!-- Error Alert -->
      <v-alert
        v-if="textChatStore.error"
        type="error"
        variant="tonal"
        closable
        @click:close="textChatStore.clearError"
        class="error-alert"
      >
        {{ textChatStore.error }}
      </v-alert>

      <!-- History Notice -->
      <v-alert
        v-if="showHistoryNotice"
        type="info"
        variant="tonal"
        class="history-notice"
        icon="mdi-history"
      >
        Answer retrieved from history
      </v-alert>

      <div
        class="response-container"
        v-show="textChatStore.history.length > 0 || textChatStore.isLoading"
      >
        <div v-for="(item, index) in textChatStore.history" :key="`${item.question}-${index}`">
          <v-card :title="item.question" :text="item.response" class="history-card" />
        </div>

        <!-- Loading card for new response -->
        <v-card v-if="textChatStore.isLoading" title="Thinking..." loading class="loading-card">
          <template v-slot:text>
            <div class="loading-text">Processing your question...</div>
          </template>
        </v-card>
      </div>
      <div class="clear-button-container">
        <v-btn @click="clearChat()" :disabled="textChatStore.isLoading" variant="outlined">
          Clear Chat
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.text-view-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.75rem;
  min-height: 100vh;
}

.text-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.text-container h2 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.question-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.question-container h2 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.question-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
}

.error-alert {
  margin: 0.75rem 0;
  flex-shrink: 0;
}

.history-notice {
  margin: 0.75rem 0;
  flex-shrink: 0;
  animation: fadeInOut 3s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.response-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;
}

.loading-card {
  opacity: 0.8;
}

.loading-text {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
}

.clear-button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 1rem;
}

@media (min-width: 768px) {
  .text-view-container {
    flex-direction: row;
    gap: 1.5rem;
    padding: 1rem;
    min-height: auto;
    max-height: calc(100vh - var(--header-height, 64px));
    overflow: hidden;
  }

  .text-container {
    flex: 1;
    margin-bottom: 0;
    overflow: hidden;
  }

  .question-container {
    flex: 1;
    overflow: hidden;
  }

  .question-input-container {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }

  .response-container {
    flex: 1;
    overflow-y: auto;
    max-height: calc(100% - 120px);
    padding-right: 0.5rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(var(--v-theme-primary), 0.3) rgba(var(--v-theme-surface-variant), 0.1);
  }

  /* Custom scrollbar styling for desktop */
  .response-container::-webkit-scrollbar {
    width: 8px;
  }

  .response-container::-webkit-scrollbar-track {
    background: rgba(var(--v-theme-surface-variant), 0.1);
    border-radius: 4px;
  }

  .response-container::-webkit-scrollbar-thumb {
    background: rgba(var(--v-theme-primary), 0.3);
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .response-container::-webkit-scrollbar-thumb:hover {
    background: rgba(var(--v-theme-primary), 0.5);
  }

  .response-container::-webkit-scrollbar-thumb:active {
    background: rgba(var(--v-theme-primary), 0.7);
  }

  .clear-button-container {
    justify-content: flex-end;
    margin-top: auto;
    padding-bottom: 0;
  }
}

@media (min-width: 1200px) {
  .text-view-container {
    gap: 2rem;
    padding: 1.5rem;
  }

  .question-input-container {
    gap: 1rem;
  }

  .response-container {
    gap: 1rem;
  }
}
</style>
