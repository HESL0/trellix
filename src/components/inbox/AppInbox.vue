<template>
  <q-page class="bg-grey-1">
    <q-toolbar class="bg-white text-black shadow-sm q-px-md q-py-sm">
      <q-toolbar-title>
        <div class="text-h5 text-weight-bold">📥 Inbox</div>
        <div class="text-subtitle2 text-grey-7">Tasks assigned to you • 12 new items</div>
      </q-toolbar-title>
      <q-btn color="primary" label="Mark All Read" size="sm" flat />
    </q-toolbar>

    <div class="q-pa-md bg-white q-ma-md rounded-borders shadow-sm">
      <div class="q-tabs flex no-wrap">
        <q-btn-toggle
          v-model="filter"
          dense
          no-caps
          outline
          toggle-color="primary"
          class="text-grey-8"
          :options="[
            { label: 'All', value: 'all' },
            { label: 'Tasks', value: 'tasks' },
            { label: 'Comments', value: 'comments' },
            { label: 'Updates', value: 'updates' },
          ]"
        />
      </div>
    </div>

    <q-list class="q-px-md q-gutter-y-sm">
      <q-item clickable v-ripple class="bg-white q-pa-md rounded-borders shadow-sm">
        <q-item-section avatar>
          <q-avatar size="36px" color="blue-1" text-color="blue" icon="task" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-medium text-black">Review Q3 roadmap draft</q-item-label>
          <q-item-label caption>From: Alex Morgan • 2 hours ago</q-item-label>
          <q-item-label caption class="text-primary">Due in 1 day</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip size="sm" color="primary" text-color="white" dense>Task</q-chip>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple class="bg-white q-pa-md rounded-borders shadow-sm">
        <q-item-section avatar>
          <q-avatar size="36px" color="green-1" text-color="green" icon="chat_bubble" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-medium text-black"
            >Commented on “Project Kickoff”</q-item-label
          >
          <q-item-label caption>“Let’s move this deadline up.” • 5 hours ago</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip size="sm" color="green" text-color="white" dense>Comment</q-chip>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple class="bg-white q-pa-md rounded-borders shadow-sm">
        <q-item-section avatar>
          <q-avatar size="36px" color="orange-1" text-color="orange" icon="update" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-medium text-black"
            >Task “Finalize Design” completed</q-item-label
          >
          <q-item-label caption>By: Sam Rivera • 1 day ago</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip size="sm" color="orange" text-color="white" dense>Update</q-chip>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple class="bg-white q-pa-md rounded-borders shadow-sm">
        <q-item-section avatar>
          <q-avatar size="36px" color="purple-1" text-color="purple" icon="person_add" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-medium text-black"
            >You were added to “Weekly Sync” board</q-item-label
          >
          <q-item-label caption>Now you’ll receive updates • 2 days ago</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip size="sm" color="purple" text-color="white" dense>Board</q-chip>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple class="bg-white q-pa-md rounded-borders shadow-sm">
        <q-item-section avatar>
          <q-avatar size="36px" color="teal-1" text-color="teal" icon="flag" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-medium text-black"
            >Urgent: Fix login bug before release</q-item-label
          >
          <q-item-label caption>From: Dev Team • 30 minutes ago</q-item-label>
          <q-item-label caption class="text-red">Overdue</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip size="sm" color="red" text-color="white" dense>Urgent</q-chip>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const filter = ref('all')
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}
</style>
