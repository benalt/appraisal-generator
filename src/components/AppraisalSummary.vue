<script setup lang="ts">
import { Appraisal } from '@/model/Appraisal'

defineProps<{
  appraisal: Appraisal,
}>()

</script>

<template>
  <div>
    <h1 id="appraisal-summary">Fine Art Inventory</h1>
    <ol>
      <li class="titleRow">
        <span class="label">Total Retail Replacement Value:</span>
        <span class="data" v-html="appraisal.appraisedValueHtml"></span>
      </li>
      <li v-for="(appraisedArtwork, idx) in appraisal.appraisedArtworks" :key="`appraisedArtwork-summary${appraisedArtwork.id}`">
        <span class="number">{{ appraisedArtwork.inventoryNumber || (idx + 1) }}</span>
        <span class="label" v-html="appraisedArtwork.labelHtml" />
        <span class="data">{{ appraisedArtwork.appraisedValueRangeHtml }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>

ol {
  list-style-type: none;
  padding: 0;
}

ol li {
  display: grid;
  grid-template-columns: .25in 1fr auto;
  column-gap: .25in;
  padding: .1in 0;
}

ol li .number {
  text-align: right;
}

ol li .label {
  grid-column-start: 2;
}

ol li .data {
  grid-column-start: 3;
}

.titleRow {
  font-weight: bold;
  border-bottom: 1px solid #333;
}
</style>