<template>
  <q-page class="bg-grey-1">
    <!-- Header -->
    <q-toolbar class="bg-white text-black shadow-sm q-px-md q-py-sm">
      <q-toolbar-title>
        <div class="text-h5 text-weight-bold">📅 Weekly Planner</div>
        <div class="text-subtitle2 text-grey-7">Organize your tasks, goals, and deadlines</div>
      </q-toolbar-title>
      <q-btn flat round dense icon="info" />
    </q-toolbar>

    <!-- About Section -->
    <div class="q-pa-md bg-white q-ma-md rounded-borders shadow-sm">
      <div class="text-h6 text-weight-medium">About this planner</div>
      <div class="text-body1 text-grey-8 q-mt-sm">
        This planner helps you track your weekly goals, break down projects, and stay focused.
        Use lists to organize tasks by day, priority, or category. Drag and drop cards to update progress.
      </div>
    </div>

    <!-- Mock Lists (Trello-style) -->
    <div class="q-pa-md" style="display: flex; overflow-x: auto; gap: 16px; padding-bottom: 24px">
      <!-- List 1 -->
      <div class="bg-white rounded-borders shadow-sm" style="min-width: 280px; max-width: 280px; height: fit-content;">
        <div class="q-pa-md text-subtitle2 text-weight-bold text-grey-8 border-b">
          🚀 This Week
        </div>
        <div class="q-pa-sm flex column gap-8">
          <q-card class="q-pa-sm shadow-none bg-blue-1 text-blue-10" flat>
            Finalize project roadmap
          </q-card>
          <q-card class="q-pa-sm shadow-none bg-orange-1 text-orange-10" flat>
            Team sync meeting
          </q-card>
          <q-card class="q-pa-sm shadow-none bg-green-1 text-green-10" flat>
            Review KPIs & metrics
          </q-card>
        </div>
        <div class="q-pa-md">
          <q-btn no-caps unelevated color="grey-3" text-color="grey-7" label="+ Add card" size="sm" />
        </div>
      </div>

      <!-- List 2 -->
      <div class="bg-white rounded-borders shadow-sm" style="min-width: 280px; max-width: 280px; height: fit-content;">
        <div class="q-pa-md text-subtitle2 text-weight-bold text-grey-8 border-b">
          ✅ Done
        </div>
        <div class="q-pa-sm flex column gap-8">
          <q-card class="q-pa-sm shadow-none bg-grey-2 text-grey-9" flat>
            Weekly planning session
          </q-card>
          <q-card class="q-pa-sm shadow-none bg-grey-2 text-grey-9" flat>
            Update client report
          </q-card>
        </div>
        <div class="q-pa-md">
          <q-btn no-caps unelevated color="grey-3" text-color="grey-7" label="+ Add card" size="sm" />
        </div>
      </div>

      <!-- List 3 -->
      <div class="bg-white rounded-borders shadow-sm" style="min-width: 280px; max-width: 280px; height: fit-content;">
        <div class="q-pa-md text-subtitle2 text-weight-bold text-grey-8 border-b">
          ⏳ In Progress
        </div>
        <div class="q-pa-sm flex column gap-8">
          <q-card class="q-pa-sm shadow-none bg-purple-1 text-purple-10" flat>
            Draft presentation
          </q-card>
          <q-card class="q-pa-sm shadow-none bg-teal-1 text-teal-10" flat>
            Research phase
          </q-card>
        </div>
        <div class="q-pa-md">
          <q-btn no-caps unelevated color="grey-3" text-color="grey-7" label="+ Add card" size="sm" />
        </div>
      </div>

      <!-- Add List Button -->
      <div style="min-width: 280px; display: flex; align-items: center; flex-shrink: 0;">
        <q-btn no-caps outline color="grey-5" label="+ Add List" class="q-ml-sm" />
      </div>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(0,0,0,0.12);
}
.gap-8 {
  gap: 8px;
}
</style>