<template>
  <q-card class="q-ma-sm shadow-2">
    <q-card-section class="bg-primary text-white">
      <div class="row items-center justify-between">
        <div class="col">
          <div v-if="!isEditing" class="text-h6 cursor-pointer" @click="startEdit">
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
          v-if="card.isUsercard !== false"
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
        @end="onDragEnd"
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
        No items yet. Add your first item above!
      </div>
       <q-form @submit.prevent="addItem" class="q-gutter-sm">
        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-input
              v-model="newItem"
              dense
              outlined
              placeholder="Add new item..."
              :rules="[(val) => !!val || 'Item cannot be empty']"
            />
          </div>
          <div class="col-auto">
            <q-btn
              type="submit"
              color="primary"
              icon="add"
              label="Add"
              :disable="!newItem.trim()"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useCardStore } from 'src/stores/cardStore'
import { ref, nextTick } from 'vue'
import draggable from 'vuedraggable'

const { card } = defineProps({
  card: Object,
})

const newItem = ref('')
const isEditing = ref(false)
const editTitle = ref('')
const titleInput = ref(null)
const editingItemId = ref(null)
const editItemContent = ref('')
const cardStore = useCardStore()

function deleteCard(id) {
  cardStore.deleteCard(id)
}

function addItem() {
  if (!newItem.value.trim()) return
  cardStore.addItemToCard(card.id, newItem.value)
  newItem.value = '' 
}

function deleteItem(itemId) {
  cardStore.deleteItemFromCard(card.id, itemId)
}

function startEdit() {
  if (card.isUsercard === false) return
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
