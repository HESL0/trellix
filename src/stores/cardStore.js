import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const cards = ref([
    { id: 1, items: [], title: 'Incomplete', isUsercard: false },
    { id: 2, items: [], title: 'complete', isUsercard: false },
  ])

  function addCard(content) {
    if (!content.trim()) return
    cards.value.push({
      id: Date.now(),
      items: [],
      title: content,
      isUsercard: true,
    })
  }

  function addItem(content) {
    if (!content.trim()) return
    cards.value.push({
      id: Date.now(),
      items: [],
      title: content,
      isUsercard: true,
    })
  }


  function deleteCard(id) {
    cards.value = cards.value.filter((card) => card.id !== id)
  }

  return { cards, addCard, deleteCard, additem }
})
