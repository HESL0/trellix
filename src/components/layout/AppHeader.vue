<template>
  <q-header reveal bordered elevated class="bg-white text-black px-4 lg:block md:block ">
    <q-toolbar>
      <q-toolbar-title class="font-bold text-x1"> Trellix</q-toolbar-title>
      <q-space />
      <q-btn flat label="account" />
      <q-btn @click="$router.push('/cards')" flat label="cards" />
      <q-btn flat label="activity" />
    </q-toolbar>
  </q-header>
</template>
<script></script>
