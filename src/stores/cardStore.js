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

function addItemToCard(cardId, content) {
  const card = cards.value.find(c => c.id === cardId)
  if (!card || !content.trim()) return
  card.items.push({
    id: Date.now(),
    content
  })
}

function deleteItemFromCard(cardId, itemId) {
  const card = cards.value.find(c => c.id === cardId)
  if (!card) return
  card.items = card.items.filter(item => item.id !== itemId)
}


  function deleteCard(id) {
    cards.value = cards.value.filter((card) => card.id !== id)
  }

  function updateCardTitle(cardId, newTitle) {
    if (!newTitle.trim()) return false
    const card = cards.value.find(c => c.id === cardId)
    if (!card || !card.isUsercard) return false
    
    card.title = newTitle.trim()
    return true
  }

  return { cards, addCard, deleteCard, addItemToCard, deleteItemFromCard, updateCardTitle }
})
