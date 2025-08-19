<template>
  <dialog
    ref="dialogRef"
    open
    class="z-1 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center absolute"
  >
    <form
      method="dialog"
      @submit.prevent="handleSubmit"
      class="bg-white flex flex-col p-10 rounded-md"
    >
      <button class="relative self-end mb-2" type="button" @click="closeModal">
        X
      </button>
      <h2 class="mb-4">{{ title }}</h2>
      <div
        v-for="field in fields"
        :key="field.name"
        class="flex flex-col items-start mb-3"
      >
        <label :for="field.name">{{ field.label }}</label>
        <input
          v-if="
            field.type === 'text' ||
            field.type === 'date' ||
            field.type === 'number'
          "
          class="border rounded-md px-2"
          :type="field.type"
          :placeholder="field.placeholder"
          v-model="formData[field.name]"
        />
        <select
          v-else-if="field.type === 'select'"
          v-model="formData[field.name]"
        >
          <option v-for="opt in field.options" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
        <!-- puoi aggiungere altri tipi di input qui -->
      </div>
      <button class="" type="submit">{{ submitLabel }}</button>
    </form>
  </dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  title: { type: String, default: "Modal" },
  fields: { type: Array, required: true }, // [{ name, label, type, placeholder, options }]
  submitLabel: { type: String, default: "Conferma" },
  initialValues: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["submit", "close-modal"]);

const formData = ref({ ...props.initialValues });

watch(
  () => props.initialValues,
  (val) => {
    formData.value = { ...val };
  }
);

function handleSubmit() {
  emit("submit", { ...formData.value });
  formData.value = { ...props.initialValues };
  emit("close-modal");
}

function closeModal() {
  emit("close-modal");
}
</script>
