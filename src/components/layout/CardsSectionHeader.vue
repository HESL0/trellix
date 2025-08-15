<template>
  <q-toolbar class="bg-white text-black q-pa-md shadow-sm">
    <q-toolbar-title>
      <div class="text-h6">Cards</div>
      <div class="text-subtitle2 text-grey-7">Manage your cards and activities</div>
    </q-toolbar-title>
   

    <div class="flex items-center space-x-2">
      <q-btn 
        flat 
        round
        class="w-8 h-8"
        @click="toggleProfileMenu"
      >
        <q-avatar size="32px" color="primary" text-color="white">
          <q-icon name="person" />
        </q-avatar>
      </q-btn>

      <q-btn
        flat
        round
        dense
        icon="menu"
        @click="toggleDialog"
      />
      
    </div>

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Menu</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-item clickable v-close-popup>
            <q-item-section>About this board</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section>Visibility: Workspace</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section>Print, export, and share</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section>Star</q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-toolbar>
</template>

<script setup>
import { ref } from 'vue'

const showProfileMenu = ref(false)
const showDialog = ref(false)

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const toggleDialog = () => {
  showDialog.value = !showDialog.value
}


</script>

<style scoped>
@media (max-width: 768px) {
  .q-toolbar {
    padding: 12px 16px;
  }
}
</style>
