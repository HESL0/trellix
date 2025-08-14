<template>
  <q-toolbar class="bg-white text-black q-pa-md shadow-sm">
    <q-toolbar-title>
      <div class="text-h6">Cards</div>
      <div class="text-subtitle2 text-grey-7">Manage your cards and activities</div>
    </q-toolbar-title>
    
    <div class="hidden md:flex items-center space-x-2">
      <q-btn flat label="Account" color="primary" size="sm" @click="$router.push('/account')" />
      <q-btn flat label="Activity" color="primary" size="sm" @click="$router.push('/activity')" />
    </div>

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
        icon="more_vert"
        class="lg:hidden"
        @click="toggleMobileMenu"
      />
    </div>

    <q-menu v-model="showMobileMenu" anchor="bottom right" self="top right">
      <q-list style="min-width: 150px">
        <q-item clickable v-close-popup @click="$router.push('/account')">
          <q-item-section>Account</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="$router.push('/activity')">
          <q-item-section>Activity</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="$router.push('/settings')">
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-menu v-model="showProfileMenu" anchor="bottom right" self="top right">
      <q-list style="min-width: 150px">
        <q-item clickable v-close-popup @click="$router.push('/profile')">
          <q-item-section>Profile</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="$router.push('/settings')">
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup @click="logout">
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-toolbar>
</template>

<script setup>
import { ref } from 'vue'

const showMobileMenu = ref(false)
const showProfileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const logout = () => {
  console.log('Logout clicked')
}
</script>

<style scoped>
@media (max-width: 768px) {
  .q-toolbar {
    padding: 12px 16px;
  }
}
</style>
