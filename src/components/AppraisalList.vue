<script setup lang="ts">
import { Appraisal } from '@/model/Appraisal'
import { computed, reactive } from 'vue';

const appraisals = reactive( await Appraisal.loadAllAppraisals() )

</script>

<template>
  <div>
    <table>
      <tr v-for="appraisal in appraisals">
        <td><RouterLink :to="`/appraisal/${appraisal.id}`">{{ appraisal.title }}</RouterLink> </td>
        <td>{{ appraisal.valuationDate }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
</style>