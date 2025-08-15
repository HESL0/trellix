<template>
  <cards-section-header />

  <div ref="cardsContainer" class="cards-container q-gutter-md">
    <draggable
      v-model="draggableCards"
      group="cards"
      item-key="id"
      class="flex no-wrap q-gutter-md"
      :animation="200"
      ghost-class="ghost-card"
      chosen-class="chosen-card"
      drag-class="drag-card"
      @start="enableAutoScrollOnDrag"
    >
      <template #item="{ element: card }">
        <div class="flex-none" :data-id="card.id" style="min-width: 300px">
          <AppCard :card="card" />
        </div>
      </template>

      <template #footer>
        <div class="flex-none" style="min-width: 300px">
          <q-card class="q-pa-md">
            <div v-if="!isAddingCard" class="flex flex-center cursor-pointer" @click="openAddCard">
              <q-icon name="add" size="md" />
            </div>
            <div v-else class="q-gutter-sm">
              <q-input
                v-model="newTitle"
                placeholder="Enter card title"
                dense
                autofocus
                ref="titleInput"
                @keyup.enter="addCard"
                @keyup.esc="closeAddCard"
              />
              <div class="row q-gutter-xs">
                <q-btn
                  label="Add"
                  color="primary"
                  size="sm"
                  @click="addCard"
                  :disable="!trimmedTitle"
                />
                <q-btn label="Cancel" size="sm" flat @click="closeAddCard" />
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
  set: (newCards) => cardStore.updateUserCardsOrder(newCards),
})

const isAddingCard = ref(false)
const newTitle = ref('')
const titleInput = ref(null)
const cardsContainer = ref(null)

const trimmedTitle = computed(() => newTitle.value.trim())

function openAddCard() {
  isAddingCard.value = true
  newTitle.value = ''
  nextTick(() => titleInput.value?.focus())
}

function closeAddCard() {
  isAddingCard.value = false
  newTitle.value = ''
}

function addCard() {
  if (!trimmedTitle.value) return
  const newCardId = cardStore.addCard(trimmedTitle.value)
  newTitle.value = ''
  nextTick(() => {
    scrollToNewCard(newCardId)
    openAddCard()
  })
}

function scrollToNewCard(cardId) {
  const el = cardsContainer.value?.querySelector(`[data-id="${cardId}"]`)
  if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}

function enableAutoScrollOnDrag() {
  const container = cardsContainer.value
  if (!container) return
  const edge = 60
  const speed = 15

  const moveHandler = (e) => {
    const rect = container.getBoundingClientRect()
    if (e.clientX < rect.left + edge) container.scrollLeft -= speed
    else if (e.clientX > rect.right - edge) container.scrollLeft += speed
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', moveHandler)
  }, { once: true })
}
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 16px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.cards-container::-webkit-scrollbar {
  display: none;
}
.flex-none {
  flex: 0 0 auto;
}
</style>
