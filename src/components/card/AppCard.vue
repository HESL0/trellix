<template>
  <q-card class="q-ma-sm shadow-2" style="width: 300px; min-width: 300px; max-width: 300px">
    <q-card-section class="bg-primary text-white">
      <div class="row items-center justify-between">
        <div class="col">
          <div
            v-if="!isEditing"
            class="text-h6 cursor-pointer"
            style="
              max-width: 240px;
              word-break: break-word;
              overflow-wrap: break-word;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
            "
            @click="startEdit"
          >
            {{ card.title }}
          </div>
          <q-input
            v-else
            v-model="editTitle"
            dense
            outlined
            dark
            color="white"
            bg-color="primary"
            class="text-h6"
            @keyup.enter="saveEdit"
            @keyup.esc="cancelEdit"
            @blur="saveEdit"
            autofocus
            ref="titleInput"
          />
        </div>
        <q-btn
          flat
          dense
          color="white"
          icon="delete"
          @click="deleteCard(card.id)"
          class="q-ml-sm"
        />
      </div>
    </q-card-section>

    <q-card-section>
      <draggable
        :model-value="card.items"
        @update:model-value="handleItemsUpdate"
        group="cardItems"
        item-key="id"
        class="q-mt-md"
        :animation="200"
        :disabled="false"
        ghost-class="ghost-item"
        chosen-class="chosen-item"
        drag-class="drag-item"
      >
        <template #item="{ element: item }">
          <q-item class="q-mb-sm bg-grey-2 rounded-borders cursor-move">
            <q-item-section>
              <div
                v-if="!isEditingItem(item.id)"
                class="cursor-pointer"
                @click="startEditItem(item)"
              >
                <q-item-label>{{ item.content }}</q-item-label>
              </div>
              <q-input
                v-else
                v-model="editItemContent"
                dense
                outlined
                placeholder="Edit item..."
                @keyup.enter="saveEditItem(item.id)"
                @keyup.esc="cancelEditItem"
                @blur="saveEditItem(item.id)"
                autofocus
              />
            </q-item-section>
            <q-item-section side>
              <div class="row q-gutter-xs">
                <q-btn icon="edit" dense flat color="primary" @click="startEditItem(item)" />
                <q-btn icon="delete" dense flat color="negative" @click="deleteItem(item.id)" />
              </div>
            </q-item-section>
          </q-item>
        </template>
      </draggable>

      <div v-if="!card.items || card.items.length === 0" class="text-center q-mt-md text-grey-6">
        No items yet. Add your first item!
      </div>

      <div v-if="!isAddingItem" class="q-mt-md">
        <q-btn
          flat
          dense
          color="primary"
          icon="add"
          label="Add new item"
          @click="startAddingItem"
          class="full-width"
        />
      </div>

      <div v-else class="q-gutter-sm q-mt-md">
        <q-input
          v-model="newItem"
          dense
          outlined
          placeholder="Enter item content"
          @keyup.enter="addItem"
          @keyup.esc="cancelAddingItem"
          autofocus
          ref="itemInput"
        />
        <div class="row q-gutter-xs">
          <q-btn
            label="Add"
            color="primary"
            size="sm"
            @click="addItem"
            :disable="!newItem.trim()"
          />
          <q-btn label="Cancel" size="sm" flat @click="cancelAddingItem" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { useCardStore } from 'src/stores/cardStore'
import { ref, nextTick } from 'vue'
import draggable from 'vuedraggable'
const $q = useQuasar()
const { card } = defineProps({
  card: Object,
})

const newItem = ref('')
const isEditing = ref(false)
const editTitle = ref('')
const titleInput = ref(null)
const editingItemId = ref(null)
const editItemContent = ref('')
const isAddingItem = ref(false)
const itemInput = ref(null)
const cardStore = useCardStore()

function deleteCard(id) {
  cardStore.deleteCard(id)
  $q.notify({ message: 'card deleted', color: 'red' })
}

function addItem() {
  if (!newItem.value.trim()) return
  cardStore.addItemToCard(card.id, newItem.value)
  newItem.value = ''
  startAddingItem()
  $q.notify({ message: 'Item added successfully.', color: 'green' })
}

function deleteItem(itemId) {
  cardStore.deleteItemFromCard(card.id, itemId)
  $q.notify({
    message: 'Item deleted.',
    color: 'red',
  })
}

function startEdit() {
  editTitle.value = card.title
  isEditing.value = true
  nextTick(() => {
    titleInput.value?.focus()
    titleInput.value?.select()
  })
}

function saveEdit() {
  if (!editTitle.value.trim()) {
    cancelEdit()
    return
  }
  if (editTitle.value.trim() !== card.title) {
    cardStore.updateCardTitle(card.id, editTitle.value)
  }
  isEditing.value = false
}

function cancelEdit() {
  isEditing.value = false
  editTitle.value = ''
}

function isEditingItem(itemId) {
  return editingItemId.value === itemId
}

function startEditItem(item) {
  editingItemId.value = item.id
  editItemContent.value = item.content
}

function saveEditItem(itemId) {
  if (!editItemContent.value.trim()) {
    cancelEditItem()
    return
  }
  if (editItemContent.value.trim() !== card.items.find((item) => item.id === itemId)?.content) {
    cardStore.updateItem(card.id, itemId, editItemContent.value)
  }
  cancelEditItem()
}

function cancelEditItem() {
  editingItemId.value = null
  editItemContent.value = ''
}

function startAddingItem() {
  isAddingItem.value = true
  newItem.value = ''
  nextTick(() => {
    itemInput.value?.focus()
  })
}

function cancelAddingItem() {
  newItem.value = ''
  isAddingItem.value = false
}

function handleItemsUpdate(newItems) {
  cardStore.updateCardItems(card.id, newItems)
}
</script>

<style scoped>
.ghost-item {
  opacity: 0.5;
  background: #c8ebfb;
}
.chosen-item {
  background-color: #f1f8ff;
  border: 2px dashed #1890ff;
}
.drag-item {
  transform: rotate(5deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.cursor-move {
  cursor: move;
}
</style>
