<template>
  <q-footer reveal elevated class="bg-white text-black" v-if="$q.screen.lt.md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title class="text-center">
        <div class="row justify-center items-center q-gutter-x-lg q-py-sm">
          <div class="col-auto text-center">
            <q-btn flat dense icon="person" class="q-pa-xs" />
            <div class="text-caption text-grey-7">Inbox</div>
          </div>
          <div class="col-auto text-center">
            <q-btn flat dense @click="$router.push('/cards')" icon="dashboard" class="q-pa-xs" />
            <div class="text-caption text-grey-7">cards</div>
          </div>
          <div class="col-auto text-center">
            <q-btn flat dense icon="timeline" class="q-pa-xs" />
            <div class="text-caption text-grey-7">Planner</div>
          </div>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
</script>
