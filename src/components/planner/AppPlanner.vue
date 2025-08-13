<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { onBeforeUnmount, ref } from 'vue'

const editor = ref(null)

editor.value = new Editor({
  content: '<p>Start typing here...</p>',
  extensions: [StarterKit],
})
onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<style>
.ProseMirror {
  min-height: 150px;
  border: 1px solid #ccc;
  padding: 10px;
  outline: none;
}
</style>
