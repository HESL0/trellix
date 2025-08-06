<template>
  <q-layout view="lHh Lpr lFf">
    <app-header></app-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <app-footer></app-footer>
  </q-layout>
</template>

<script setup>
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'

</script>
