<script setup lang="ts">
import { useTextChatStore } from '@/stores/text-chat'

const textChatStore = useTextChatStore()

const sendQuestion = () => {
  textChatStore.clearError()

  textChatStore.text = textChatStore.text.trim()
  textChatStore.question = textChatStore.question.trim()

  textChatStore.createPrompt()
  textChatStore.sendPrompt()
}

const clearChat = () => {
  textChatStore.clearChat()
}
</script>

<template>
  <v-container fluid class="text-view-container">
    <div class="text-container">
      <h2>Enter the text you would like to ask questions about</h2>
      <v-textarea
        variant="outlined"
        v-model="textChatStore.text"
        label="Text"
        rows="16"
        :error-messages="
          !textChatStore.text.trim() && textChatStore.error ? ['Text is required'] : []
        "
        @input="textChatStore.clearError"
      />
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
  gap: 1rem;
  flex: 1;
  max-height: calc(100vh - var(--header-height, 64px));
  overflow: hidden;
}

.text-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  overflow: hidden;
}

.question-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  overflow: hidden;
}

.question-input-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.error-alert {
  margin: 0.5rem 0;
  flex-shrink: 0;
}

.response-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  flex: 1;
  overflow-y: auto;
  max-height: calc(100% - 120px);
  padding-right: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--v-theme-primary), 0.3) rgba(var(--v-theme-surface-variant), 0.1);
}

/* Custom scrollbar styling */
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

.history-card {
  margin-bottom: 0.5rem;
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
  justify-content: flex-end;
  margin-top: auto;
}

.text-view-row {
  height: calc(100% - var(--header-height));
}

.submit-btn {
  min-width: 100px;
}
</style>
