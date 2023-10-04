<script setup lang="ts">
import AppraisalDoc from '@/components/AppraisalDoc.vue';

</script>

<template>
  <main>
    <!-- div id="controls">
      <button @click="exportToPDF">Export PDF</button>
    </div-->
    <Suspense>
      <div id="appraisalDoc">
        <AppraisalDoc />
      </div>
    </Suspense>
  </main>
</template>
<style scoped>

main {
  background: #cecece;
}
#appraisalDoc {
  margin: 0 auto;
  background: #fff;
}
</style>



