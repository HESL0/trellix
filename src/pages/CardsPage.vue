<template>
  <AppHeader/>

  <div class="flex no-wrap q-gutter-md overflow-auto q-pa-md">
    <div
      v-for="card in cards"
      :key="card.id"
      class="flex-none"
      style="min-width: 300px;"
    >
      <AppCard :card="card" />
    </div>

    <div class="flex-none" style="min-width: 300px;">
      <q-card class="q-pa-md">
        <div v-if="!isAddingCard" class="flex flex-center cursor-pointer" @click="startAddingCard">
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
            <q-btn
              label="Cancel"
              size="sm"
              flat
              @click="cancelAddingCard"
            />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useCardStore } from '../stores/cardStore'
import AppCard from '../components/card/AppCard.vue'
import AppHeader from 'src/components/layout/AppHeader.vue'

const cardStore = useCardStore()
const isAddingCard = ref(false)
const newTitle = ref('')
const titleInput = ref(null)

const cards = computed(() => cardStore.cards)

function startAddingCard() {
  isAddingCard.value = true
  newTitle.value = ''
  nextTick(() => {
    titleInput.value?.focus()
  })
}

function addCard() {
  if (newTitle.value.trim()) {
    cardStore.addCard(newTitle.value.trim())
    newTitle.value = ''
    isAddingCard.value = false
  }
}

function cancelAddingCard() {
  newTitle.value = ''
  isAddingCard.value = false
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
