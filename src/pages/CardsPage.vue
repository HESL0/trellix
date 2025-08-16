<template>
  <cards-section-header />

  <div ref="cardsContainer" class="cards-container q-gutter-md">
    <div v-if="isLoading" class="flex no-wrap q-gutter-md">
      <CardSkeleton v-for="i in 3" :key="i" />
    </div>

    <draggable
      v-else
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
            <div v-if="!isAddingCard" class="flex flex-center cursor-pointer text-grey-7" @click="openAddCard">
              <q-icon name="add" size="sm" class="q-mr-xs" /> Add a card
            </div>

            <div v-else ref="addCardFormRef" class="q-gutter-sm">
              <q-input
                ref="titleInput"
                v-model="newTitle"
                placeholder="Enter card title"
                dense
                autofocus
                @keyup.enter="addCard"
                @keyup.esc="closeAddCard"
              />
              <div class="row q-gutter-xs">
                <q-btn
                  label="Add"
                  color="positive"
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
import { useQuasar } from 'quasar'
import { computed, nextTick, ref, watch, onMounted } from 'vue'
import { useCardStore } from '../stores/cardStore'
import draggable from 'vuedraggable'
import AppCard from '../components/card/AppCard.vue'
import CardsSectionHeader from '../components/layout/CardsSectionHeader.vue'
import CardSkeleton from '../components/ui/CardSkeleton.vue'

const $q = useQuasar()
const cardStore = useCardStore()

const isLoading = ref(true)
const cards = computed(() => cardStore.cards)
const draggableCards = computed({
  get: () => cards.value,
  set: (newCards) => cardStore.updateUserCardsOrder(newCards),
})

const isAddingCard = ref(false)
const newTitle = ref('')
const titleInput = ref(null)
const cardsContainer = ref(null)
const addCardFormRef = ref(null)

const trimmedTitle = computed(() => newTitle.value.trim())

onMounted(async () => {
  // Simulate loading delay - replace with actual data fetching
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoading.value = false
})

function openAddCard() {
  isAddingCard.value = true
  newTitle.value = ''
  nextTick(() => {
    titleInput.value?.focus()
    scrollToBottom()
  })
}

function closeAddCard() {
  isAddingCard.value = false
  newTitle.value = ''
}
function addCard() {
  if (!trimmedTitle.value) return
  void cardStore.addCard(trimmedTitle.value)
  newTitle.value = ''
  nextTick(() => {
    scrollToBottom()
    openAddCard()
  })
  $q.notify({ message: 'Card added', color: 'positive', timeout: 800 })
}

function scrollToBottom() {
  const container = cardsContainer.value
  if (container) {
    container.scrollLeft = container.scrollWidth
  }
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

let clickOutsideCleanup = null

watch(isAddingCard, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      const handleClickOutside = (event) => {
        if (addCardFormRef.value && !addCardFormRef.value.contains(event.target)) {
          closeAddCard()
        }
      }
      
      clickOutsideCleanup = () => {
        document.removeEventListener('click', handleClickOutside)
      }
      
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    if (clickOutsideCleanup) {
      clickOutsideCleanup()
      clickOutsideCleanup = null
    }
  }
})
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 16px;
  gap: 16px;
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