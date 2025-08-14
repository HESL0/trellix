import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const cards = ref([
  ])

  function addCard(content) {
    if (!content.trim()) return
    const newCard = {
      id: Date.now(),
      items: [],
      title: content,
    }
    cards.value.push(newCard)
    return newCard.id
  }

  function addItemToCard(cardId, content) {
    const card = cards.value.find((c) => c.id === cardId)
    if (!card || !content.trim()) return
    card.items.push({
      id: Date.now(),
      content,
    })
  }

  function deleteItemFromCard(cardId, itemId) {
    const card = cards.value.find((c) => c.id === cardId)
    if (!card) return
    card.items = card.items.filter((item) => item.id !== itemId)
  }

  function deleteCard(id) {
    cards.value = cards.value.filter((card) => card.id !== id)
  }

  function updateCardTitle(cardId, newTitle) {
    if (!newTitle.trim()) return false
    const card = cards.value.find((c) => c.id === cardId)
    if (!card) return false

    card.title = newTitle.trim()
    return true
  }

  function updateItem(cardId, itemId, newContent) {
    if (!newContent.trim()) return false
    const card = cards.value.find((c) => c.id === cardId)
    if (!card) return false

    const item = card.items.find((item) => item.id === itemId)
    if (!item) return false

    item.content = newContent.trim()
    return true
  }

  function moveItem(itemId, fromCardId, toCardId) {
    const fromCard = cards.value.find((c) => c.id === fromCardId)
    const toCard = cards.value.find((c) => c.id === toCardId)

    if (!fromCard || !toCard) return false

    const itemIndex = fromCard.items.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) return false

    const [item] = fromCard.items.splice(itemIndex, 1)
    toCard.items.push(item)

    return true
  }

  function updateCardItems(cardId, newItems) {
    const card = cards.value.find((c) => c.id === cardId)
    if (!card) return false
    card.items = newItems
    return true
  }

  function updateUserCardsOrder(newOrder) {
    cards.value = [...newOrder]
  }

  return {
    cards,
    addCard,
    deleteCard,
    addItemToCard,
    deleteItemFromCard,
    updateCardTitle,
    updateItem,
    moveItem,
    updateCardItems,
    updateUserCardsOrder,
  }
})
