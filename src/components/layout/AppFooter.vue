<template>
  <q-footer elevated class="bg-white text-black border-t border-gray-200 shadow-sm transition-all duration-300">
    <div class="flex justify-around py-3 sm:hidden">
      <q-btn
        v-for="item in navItems"
        :key="item.label"
        flat dense round size="lg"
        :icon="item.icon"
        @click="go(item.route)"
        :class="[
          'text-gray-700 transition-colors duration-200',
          { 'text-teal': isActive(item.route) }
        ]"
      >
        <q-badge 
          v-if="item.badge" 
          color="teal" 
          floating
          class="animate-pulse"
        >
          {{ item.badge }}
        </q-badge>
      </q-btn>
    </div>

    <div class="hidden sm:flex justify-center items-center space-x-1 py-2 px-4">
      <q-btn
        v-for="item in navItems"
        :key="item.label"
        flat rounded unelevated
        :class="[
          'flex items-center space-x-2 px-4 py-2 transition-all duration-200',
          'hover:bg-gray-100 rounded-lg',
          { 'text-teal bg-teal/10': isActive(item.route) }
        ]"
        @click="go(item.route)"
      >
        <q-icon :name="item.icon" size="md" />
        <span class="text-sm font-medium">{{ item.label }}</span>
        <q-badge 
          v-if="item.badge" 
          color="teal" 
          class="ml-1 animate-bounce"
        >
          {{ item.badge }}
        </q-badge>
      </q-btn>
    </div>

    <div class="hidden sm:flex justify-center items-center py-2 border-t border-gray-100">
      <span class="text-xs text-gray-500">© {{ currentYear }} Your Company. All rights reserved.</span>
    </div>
  </q-footer>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentYear = new Date().getFullYear()

const navItems = [
  { icon: 'inbox', label: 'Inbox', route: '/inbox', badge: 3},
  { icon: 'dashboard', label: 'Cards', route: '/cards' },
  { icon: 'event', label: 'Planner', route: '/planner' },
]

function go(routePath) {
  router.push(routePath)
}

function isActive(routePath) {
  return route.path.startsWith(routePath)
}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>