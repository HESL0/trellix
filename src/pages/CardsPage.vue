<template>
  <div class="row q-col-gutter-md">
    <div v-for="card in cards" :key="card.id" class="col-12 col-sm-6 col-md-4">
      <AppCard :card="card" />
    </div>

    <div class="col-12 col-sm-6 col-md-4">
      <q-card class="q-pa-md flex flex-center cursor-pointer" @click="showPrompt = true">
        <q-icon name="add" size="md" />
      </q-card>
    </div>

    <q-dialog v-model="showPrompt" persistent>
      <q-card>
        <q-card-section>
          <q-input v-model="newTitle" label="Card Title" autofocus />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add" @click="addCard" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useCardStore } from '../stores/cardStore'
import AppCard from '../components/card/AppCard.vue'

const cardStore = useCardStore()
const showPrompt = ref(false)
const newTitle = ref('')

const cards = computed(() => cardStore.cards)

function addCard() {
  cardStore.addCard(newTitle.value)
  newTitle.value = ''
  showPrompt.value = false
}
</script>
