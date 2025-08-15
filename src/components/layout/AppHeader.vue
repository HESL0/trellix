<template>
  <q-header elevated class="flex bg-white text-black shadow-md">
    <q-toolbar class="q-px-md q-px-xs">
      
      <q-btn flat round dense icon="menu" class="q-mr-sm q-md-none" />

      <q-toolbar-title class="flex-1 q-px-sm">
        <q-input
          v-model="searchTerm"
          dense
          rounded
          outlined
          placeholder="Search..."
          clearable
          class="w-full"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar-title>

      <div class="row items-center q-gutter-sm">
        <q-btn flat round dense icon="notifications" />
        <q-btn flat round dense icon="person" />
        <q-btn flat round dense icon="settings" class="q-none q-md-flex" />
      </div>

    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from 'vue'

const searchTerm = ref('')
</script>

<style scoped>
.q-header {
  height: 70px;
}
.q-input__control {
  background-color: #f9f9f9;
}
</style>
