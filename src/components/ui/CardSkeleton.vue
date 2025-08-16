<template>
  <q-card class="card" flat bordered>
    <q-card-section class="bg-teal">
      <q-skeleton type="text" width="60%" class="text-h6" />
    </q-card-section>

    <div class="q-pa-sm">
      <div v-for="i in 3" :key="i" class="q-my-xs">
        <q-item class="item-card">
          <q-item-section>
            <q-skeleton type="text" width="80%" />
            <q-skeleton type="text" width="60%" class="q-mt-xs" />
          </q-item-section>
        </q-item>
      </div>
    </div>

    <q-card-actions>
      <q-skeleton type="text" width="100%" height="40px" />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.card {
  width: 300px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.item-card {
  border-radius: 4px;
  background: white;
}
</style>
