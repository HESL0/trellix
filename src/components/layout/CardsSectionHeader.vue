<template>
  <q-toolbar class="bg-white text-black q-pa-md shadow-sm">
    <q-toolbar-title>
      <div class="text-h6">Cards</div>
      <div class="text-subtitle2 text-grey-7">Manage your cards and activities</div>
    </q-toolbar-title>

    <div class="flex items-center space-x-2 q-mr-md menu-on-mobile">
      <q-btn flat round class="w-8 h-8" @click="toggleProfileMenu">
        <q-avatar size="32px" color="primary" text-color="white">
          <q-icon name="person" />
        </q-avatar>
      </q-btn>

      <q-btn
        flat
        round
        dense
        icon="menu"
        @click="showDialog = true"
        class="hover:bg-grey-2 rounded-full transition-all duration-200 hover:scale-110"
      />
    </div>
  </q-toolbar>

  <q-dialog
    v-model="showDialog"
    position="right"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card style="width: 320px; max-width: 90vw; height: 100vh">
      <q-toolbar class="q-px-md flex">
        <q-toolbar-title class="q-ml-sm">Menu</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-list>
        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="info" /></q-item-section>
          <q-item-section>About this board</q-item-section>
        </q-item>

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="visibility" /></q-item-section>
          <q-item-section>Visibility: Workspace</q-item-section>
        </q-item>

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="print" /></q-item-section>
          <q-item-section>Print, export, and share</q-item-section>
        </q-item>

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="star" /></q-item-section>
          <q-item-section>Star</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="image" /></q-item-section>
          <q-item-section>Change background</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <div class="q-px-sm q-pb-md">
          <div class="text-caption text-grey-5 q-mb-sm">Upgrade</div>
          <q-card flat bordered class="q-pa-md">
            <div class="flex items-center q-mb-xs">
              <q-icon name="sell" class="q-mr-sm" size="24px" />
              <div class="text-bold">Upgrade to add Custom Fields</div>
            </div>
            <div class="text-caption">
              Add dropdowns, text fields, dates, and more to your cards.
            </div>
            <div class="q-mt-sm">
              <a href="#" class="text-blue text-bold" style="text-decoration: none"
                >Start free trial</a
              >
            </div>
          </q-card>
        </div>

        <q-separator class="q-my-md" />

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="bolt" /></q-item-section>
          <q-item-section>Automation</q-item-section>
        </q-item>

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="rocket_launch" /></q-item-section>
          <q-item-section>Power-Ups</q-item-section>
        </q-item>

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="label" /></q-item-section>
          <q-item-section>Labels</q-item-section></q-item
        >

        <q-item clickable class="q-py-md">
          <q-item-section avatar><q-icon name="tag_faces" /></q-item-section>
          <q-item-section>Stickers</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const showProfileMenu = ref(false)
const showDialog = ref(false)

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}
</script>
<style scoped>
/* Adjust toolbar for smaller screens */
@media (max-width: 768px) {
  .q-toolbar {
    padding: 12px 16px;
    justify-content: center; /* This will center the items */
  }

  .q-toolbar-title {
    flex: 1;
    text-align: center; /* This centers the "Cards" title */
  }

  .flex {
    margin-right: 0 !important;
  }
}

@media (min-width: 769px) {
  .q-mr-md {
    margin-right: 16px;
  }
}

/* New style for the right-aligned menu section on mobile */
.menu-on-mobile {
  position: absolute;
  right: 16px; /* Adjust this value for the desired spacing from the right edge */
  top: 50%;
  transform: translateY(-50%);
}
</style>
