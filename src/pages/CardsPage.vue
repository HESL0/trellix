<template>
  
  <cards-section-header />

  <div ref="cardsContainer" class="flex no-wrap q-gutter-md overflow-auto q-pa-md">
     
    <draggable
      v-model="draggableCards"
      group="cards"
      item-key="id"
      class="flex no-wrap q-gutter-md"
      :animation="200"
      ghost-class="ghost-card"
      chosen-class="chosen-card"
      drag-class="drag-card"
      @end="onCardDragEnd"
      :clone="false"
    >
    
      <template #item="{ element: card }">
        <div class="flex-none" style="min-width: 300px">
          <AppCard :card="card" />
        </div>
        
      </template>

      <template #footer>
        <div class="flex-none" style="min-width: 300px">
          <q-card class="q-pa-md">
            <div
              v-if="!isAddingCard"
              class="flex flex-center cursor-pointer"
              @click="startAddingCard"
            >
              <q-icon name="add" size="md" />
            </div>

            <div v-else class="q-gutter-sm">
              <q-input
                v-model="newTitle"
                placeholder="Enter card title"
                dense
                autofocus
                @keyup.enter="addCard"
                @keyup.esc="cancelAddingCard"
                ref="titleInput"
              />
              <div class="row q-gutter-xs">
                <q-btn
                  label="Add"
                  color="primary"
                  size="sm"
                  @click="addCard"
                  :disable="!newTitle.trim()"
                />
                <q-btn label="Cancel" size="sm" flat @click="cancelAddingCard" />
              </div>
            </div>
          </q-card>
        </div>
      </template>
    </draggable>
   
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { useCardStore } from '../stores/cardStore'
import draggable from 'vuedraggable'
import AppCard from '../components/card/AppCard.vue'
import CardsSectionHeader from '../components/layout/CardsSectionHeader.vue'

const cardStore = useCardStore()
const cards = computed(() => cardStore.cards)
const draggableCards = computed({
  get: () => cards.value,
  set: (newCards) => {
    cardStore.updateUserCardsOrder(newCards)
  },
})

const isAddingCard = ref(false)
const newTitle = ref('')
const titleInput = ref(null)
const cardsContainer = ref(null)

function startAddingCard() {
  isAddingCard.value = true
  newTitle.value = ''
  nextTick(() => {
    titleInput.value?.focus()
  })
}

function addCard() {
  if (newTitle.value.trim()) {
    const newCardId = cardStore.addCard(newTitle.value.trim())
    newTitle.value = ''
    startAddingCard()
    
    // Scroll to the newly created card
    nextTick(() => {
      scrollToNewCard(newCardId)
    })
  }
}

function cancelAddingCard() {
  newTitle.value = ''
  isAddingCard.value = false
}

function scrollToNewCard(cardId) {
  nextTick(() => {
    if (!cardsContainer.value) return
    
    const cardElements = cardsContainer.value.querySelectorAll('.flex-none')
    const newCardIndex = cards.value.findIndex(card => card.id === cardId)
    
    if (newCardIndex !== -1 && cardElements[newCardIndex]) {
      const newCardElement = cardElements[newCardIndex]
      
      const containerRect = cardsContainer.value.getBoundingClientRect()
      const cardRect = newCardElement.getBoundingClientRect()
      
      const scrollLeft = cardsContainer.value.scrollLeft
      const targetScroll = scrollLeft + (cardRect.left - containerRect.left)
      
      cardsContainer.value.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  })
}
</script>

<style scoped>
.overflow-auto {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.overflow-auto::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}
</style>
