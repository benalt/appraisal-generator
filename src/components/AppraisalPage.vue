    <script setup lang="ts">
import { ref, onMounted } from 'vue';

const wrapper = ref(null);
let pageCount = 1;

const maxHeight = 96 * 9.75;


defineProps<{
  firstPage?: boolean
}>()

defineExpose ({
  pageCount
})

function setupPages(){
  const wrapperNode:HTMLDivElement|null = wrapper.value;
  if (wrapperNode) {
    /*
    const page = wrapperNode.querySelector('.page:last-of-type')
    if (page.offsetHeight > maxHeight) {
      console.log('too tall');
      //setupPages()
    }
    console.log('not too tall');
    */
  }

}

onMounted(() => {
  setupPages();
});


</script>

<template>
  <div class="pageWrapper" ref="wrapper">
    <div class="page">
        <hr v-if="!firstPage"/>
        <slot />
    </div>
  </div>
</template>

<style scoped>

.page {
  width: auto;
  min-height: 9.75in;
  page-break-after: always;
  margin: 0 auto;
}

.titlePage .page {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}

</style>