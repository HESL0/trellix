<template>
  <q-card class="q-ma-sm shadow-2">
    <q-card-section darg class="bg-primary text-white">
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

      <q-list v-if="card.items && card.items.length" class="q-mt-md">
        <q-item v-for="item in card.items" :key="item.id" class="q-mb-sm bg-grey-2 rounded-borders">
          <q-item-section draggable="true" dropzone="move" >
            <q-item-label>{{ item.content }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="delete" dense flat color="negative" @click="deleteItem(item.id)" />
          </q-item-section>
        </q-item>
      </q-list>

      <div v-else class="text-center q-mt-md text-grey-6">
        No items yet. Add your first item above!
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useCardStore } from 'src/stores/cardStore'
import { ref, nextTick } from 'vue'

const { card } = defineProps({
  card: Object,
})

const newItem = ref('')
const isEditing = ref(false)
const editTitle = ref('')
const titleInput = ref(null)
const cardStore = useCardStore()

function deleteCard(id) {
  cardStore.deleteCard(id)
}

function addItem() {
  if (!newItem.value.trim()) return
  cardStore.addItemToCard(card.id, newItem.value)
  newItem.value = '' // Clear input after adding
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
</script>
