<template>
  <dialog
    v-if="open"
    class="z-10 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center absolute"
  >
    <div class="bg-white flex flex-col p-8 rounded-md min-w-[300px]">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <button type="button" @click="$emit('close')">X</button>
      </div>

      <!-- Form dinamico -->
      <form @submit.prevent="handleSubmit">
        <div
          v-for="field in fields"
          :key="field.name"
          class="flex flex-col gap-1 mb-3"
        >
          <label :for="field.name">{{ field.label }}</label>
          <input
            v-if="
              field.type === 'text' ||
              field.type === 'date' ||
              field.type === 'number'
            "
            :type="field.type"
            :id="field.name"
            v-model="formData[field.name]"
            :placeholder="field.placeholder"
            class="border rounded px-2"
          />
          <select
            v-else-if="field.type === 'select'"
            :id="field.name"
            v-model="formData[field.name]"
            class="border rounded px-2"
          >
            <option v-for="opt in field.options" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
          <!-- Aggiungi altri tipi se necessario -->
        </div>
        <div class="flex justify-end mt-4 gap-2">
          <slot name="footer">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {{ submitLabel }}
            </button>
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 rounded"
              @click="$emit('close')"
            >
              Chiudi
            </button>
          </slot>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: "" },
  fields: { type: Array, default: () => [] }, // [{ name, label, type, placeholder, options }]
  initialValues: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: "Conferma" },
});
const emit = defineEmits(["submit", "close"]);

const formData = ref({ ...props.initialValues });

watch(
  () => props.initialValues,
  (val) => {
    formData.value = { ...val };
  }
);

function handleSubmit() {
  emit("submit", { ...formData.value });
  emit("close");
}
</script>
