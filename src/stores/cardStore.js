import { defineStore } from "pinia";
import { ref } from "vue";

export const useCardStore = defineStore('card', () => {
  const cards = ref([
    {id:1, content: 'sd'}

  ]
  )

  function addCard(content) {
    if (!content.trim()) return
    cards.value.push({
      id: Date.now(),
      content
    })
  }

  function deleteCard(id) {
    cards.value = cards.value.filter(card => card.id !== id)
  }

  return { cards, addCard, deleteCard }
})