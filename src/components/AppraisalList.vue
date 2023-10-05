<script setup lang="ts">
import { Appraisal } from '@/model/Appraisal'
import { computed, reactive } from 'vue';

const appraisals = reactive( await Appraisal.loadAllAppraisals() )

</script>

<template>
  <div class="main">
    <h1>Available Appraisals</h1>
    <table>
      <tr v-for="(appraisal, idx) in appraisals">
        <td>{{ idx + 1 }}</td>
        <td><RouterLink :to="`/appraisal/${appraisal.id}`">{{ appraisal.title }}</RouterLink> </td>
        <td>{{ appraisal.valuationDate }}</td>
        <td>{{appraisal.id}}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;
}

h1 {
  border-bottom: 1px solid #cecece;
}
</style>