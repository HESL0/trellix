<template>
  <q-footer elevated class="bg-white text-black border-t border-gray-200">

    <!-- Mobile / Tablet: Big icons only -->
    <div class="flex justify-around py-3 sm:hidden">
      <q-btn
        v-for="item in navItems"
        :key="item.label"
        flat dense round size="lg"
        :icon="item.icon"
        @click="go(item.route)"
        class="text-gray-700"
      />
    </div>

    <!-- Desktop / Laptop: Centered footer with icon + label -->
    <div class="hidden sm:flex justify-center items-center space-x-6 py-2">
      <q-btn
        v-for="item in navItems"
        :key="item.label"
        flat rounded unelevated
        class="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100"
        @click="go(item.route)"
      >
        <q-icon :name="item.icon" size="md" />
        <span class="text-sm font-medium">{{ item.label }}</span>
      </q-btn>
    </div>

  </q-footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const navItems = [
  { icon: 'inbox', label: 'Inbox', route: '/inbox' },
  { icon: 'dashboard', label: 'Cards', route: '/cards' },
  { icon: 'event', label: 'Planner', route: '/planner' },
]

function go(route) {
  router.push(route)
}
</script>
