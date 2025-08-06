<template>
  <q-card class="q-ma-sm">
    <q-card-section>{{ card.content }}</q-card-section>
    <q-btn
      flat
      dense
      color="red"
      icon="delete"
      @click="deleteCard(card.id)"
    />
  </q-card>
</template>

<script setup>
import { useCardStore } from 'src/stores/cardStore'

const { card } = defineProps({
  card: Object
})

const cardStore = useCardStore()

function deleteCard(id) {
  cardStore.deleteCard(id)
}
</script>