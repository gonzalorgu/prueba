<template>
  <section v-if="simpson ">
    <h2>Simpsons#{{simpson?.id}}</h2>
    <h2>mi nombre es {{simpson?.name}}</h2>
    <img :src="`https://cdn.thesimpsonsapi.com/200${simpson.image}`":alt="simpson.name">
    <button :disabled="simpsonId==1" @click="simpsonId--">Anterior</button>
    <button @click="simpsonId++">siguiente</button>

    <ul>
      <li v-for="frases in simpson.frases">
        {{frases}}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSimpson } from '../composable/useSimpson';
import type { SimpsonsResponse } from '../interface/simpsonsResponse'

interface simpson {
    id: Number;
    name: string;
    image: string;
    frases: string[];s
    genero?: string;
}

const simpson = ref<simpson | null>(null);
const simpsonId = ref(1);

const { data } = useSimpson<SimpsonsResponse>(
  () => `https://thesimpsonsapi.com/api/characters/${simpsonId.value}`
);

watch(data, (newSimpson) => {
  if (!newSimpson) return;

  simpson.value = {
    id: newSimpson.id,
    name: newSimpson.name,
    image: newSimpson.portrait_path,
    frases: newSimpson.phrases,
    genero: newSimpson.gender
  };
});
</script>

<style lang="scss" scoped>
section{
  display:flex;
  flex-direction: column;
  gap:10px;
  align-items:center;
  border:solid;
  border-color:black;
  border-radius:40px;
}
button{
  background-color:aqua;
  margin:4px;

}
</style>
