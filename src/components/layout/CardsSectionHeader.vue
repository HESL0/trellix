<template>
  <q-toolbar class="bg-white text-black q-pa-md">
    <q-toolbar-title>
      <div class="text-h6">Cards</div>
      <div class="text-subtitle2 text-grey-7">Manage your cards and activities</div>
    </q-toolbar-title>
    <q-space />
    <q-btn 
      flat 
      label="Account" 
      color="primary"
      size="sm"
      @click="$router.push('/account')"
    />
    <q-btn 
      flat 
      label="Activity" 
      color="primary"
      size="sm"
      @click="$router.push('/activity')"
    />
  </q-toolbar>
</template>

<script setup>
// This component provides a section header specifically for the cards page
</script>
