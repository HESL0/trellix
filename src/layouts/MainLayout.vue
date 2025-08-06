<template>
  <q-layout view="lHh Lpr lFf">
    <app-header></app-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppHeader from '../components/layout/AppHeader.vue'

</script>
