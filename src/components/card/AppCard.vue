<template>
  <q-card class="card" flat bordered>
    <q-card-section class="bg-teal text-white">
      <div v-if="!isEditingTitle" class="text-h6 cursor-pointer" @click="startEditingTitle">
        {{ card.title }}
      </div>
      <q-input
        v-else
        v-model="editingTitle"
        dense
        autofocus
        @keyup.enter="saveTitle"
        @keyup.esc="cancelEditingTitle"
        @blur="cancelEditingTitle"
        class="text-h6"
        input-class="text-white"
        borderless
      />
    </q-card-section>

    <div class="items-container">
      <draggable
        v-model="draggableItems"
        group="items"
        item-key="id"
        class="q-pa-sm"
        :animation="200"
        ghost-class="ghost-item"
        @start="handleDragStart"
      >
        <template #item="{ element: item }">
          <q-item clickable class="q-my-xs item-card" @click="openEditModal(item)">
            <q-item-section>
              <q-item-label class="text-weight-medium">{{ item.content }}</q-item-label>
              <q-item-label
                v-if="item.description"
                caption
                class="text-grey-7 ellipsis-2-lines q-mt-xs"
              >
                <q-icon name="notes" size="xs" class="q-mr-xs" />
                {{ item.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </draggable>
    </div>

    <q-card-actions ref="addItemFormRef">
      <q-input
        v-model="newItemContent"
        placeholder="Add an item"
        dense
        borderless
        class="full-width"
        @keyup.enter="addItem"
      >
        <template #append>
          <q-btn v-if="newItemContent" icon="add" dense flat round @click="addItem" />
        </template>
      </q-input>
    </q-card-actions>

    <q-dialog v-model="showEditModal" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="flex items-center q-pa-sm q-pb-none">
          <q-space />
          <q-btn icon="visibility" flat round dense />
          <q-btn icon="share" flat round dense />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="row items-center q-pb-none">
          <q-input
            v-model="editingItem.content"
            label="Title"
            dense
            autofocus
            class="q-mb-md full-width"
            outlined
          />
        </q-card-section>

        <q-card-section>
          <div class="row q-gutter-sm q-mb-md">
            <q-btn outline icon="add" label="Add" @click="addItem" />
            <q-btn outline icon="tag" label="Labels" />
            <q-btn outline icon="event" label="Dates" />
          </div>

          <q-separator class="q-mb-md" />

          <q-icon name="notes" size="xs" class="q-mr-xs" />Description
          <q-input
            v-model="editingItem.description"
            placeholder="😄 say it with an emoji, just type ':'"
            type="textarea"
            autogrow
            dense
            outlined
            class="q-mb-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="teal" v-close-popup />
          <q-btn
            label="Save"
            color="teal"
            @click="saveItem"
            :disable="!editingItem.content.trim()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useCardStore } from '../../stores/cardStore'
import draggable from 'vuedraggable'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['dragStart'])

const cardStore = useCardStore()
const newItemContent = ref('')
const showEditModal = ref(false)
const editingItem = ref({
  id: null,
  content: '',
  description: '',
})
const addItemFormRef = ref(null)
const isEditingTitle = ref(false)
const editingTitle = ref('')

const draggableItems = computed({
  get: () => props.card.items,
  set: (newItems) => {
    cardStore.updateCardItems(props.card.id, newItems)
  },
})

let clickOutsideCleanup = null

const handleClickOutside = (event) => {
  if (addItemFormRef.value?.contains(event.target)) return
  newItemContent.value = ''
}

watch(newItemContent, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      clickOutsideCleanup = () => {
        document.removeEventListener('click', handleClickOutside)
      }
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    clickOutsideCleanup?.()
    clickOutsideCleanup = null
  }
})

onUnmounted(() => {
  clickOutsideCleanup?.()
})

function handleDragStart() {
  emit('dragStart')
}

function addItem() {
  if (!newItemContent.value.trim()) return
  cardStore.addItemToCard(props.card.id, newItemContent.value)
  newItemContent.value = ''
}

function openEditModal(item) {
  editingItem.value = { ...item }
  showEditModal.value = true
}

function saveItem() {
  if (!editingItem.value.content.trim()) return

  cardStore.updateItem(
    props.card.id,
    editingItem.value.id,
    editingItem.value.content,
    editingItem.value.description,
  )

  showEditModal.value = false
}

function startEditingTitle() {
  isEditingTitle.value = true
  editingTitle.value = props.card.title
}

function saveTitle() {
  if (!editingTitle.value.trim()) return
  cardStore.updateCardTitle(props.card.id, editingTitle.value)
  isEditingTitle.value = false
}

function cancelEditingTitle() {
  isEditingTitle.value = false
  editingTitle.value = ''
}
</script>

<style scoped>
.card {
  width: 300px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.items-container {
  overflow-y: auto;
  flex-grow: 1;
}

.items-container::-webkit-scrollbar {
  width: 6px;
}

.items-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.item-card {
  border-radius: 4px;
  background: white;
  transition: all 0.2s ease;
}

.item-card:hover {
  background: #f5f5f5;
}

.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ghost-item {
  opacity: 0.5;
  background: #c8ebfb;
  border-radius: 4px;
}
</style>
