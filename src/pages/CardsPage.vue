<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Cards</div>

    <div class="row q-col-gutter-md">
      <div v-for="card in cardStore.cards" :key="card.id" class="col-12 col-sm-6 col-md-4">
        <AppCard :card="card" />
      </div>
    </div>

    <div v-if="cardStore.cards.length === 0" class="text-center q-mt-xl">
      <q-icon name="note" size="xl" color="grey" />
      <div class="text-h6 text-grey">No cards yet</div>
    </div>
  </q-page>
</template>

<script setup>
import { useCardStore } from 'src/stores/cardStore'
import AppCard from 'src/components/card/AppCard.vue'

const cardStore = useCardStore()
</script>
