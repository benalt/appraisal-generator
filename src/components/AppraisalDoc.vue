<script setup lang="ts">
import { Appraisal } from '@/model/Appraisal'
import { computed, reactive } from 'vue';
import AppraisalPage from './AppraisalPage.vue';
import ArtworkEntry from './ArtworkEntry.vue';
import AppraisalSummary from './AppraisalSummary.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const id:string = route.params.id;

const appraisal = reactive( await Appraisal.loadAppraisal(id) )

function lineBreaks(input?:string):string {
  if (!input) { return "" }
  return input.replace(/(?:\r\n|\r|\n)/g, '<br>');
}
</script>

<template>
  <div id="appraisalDocInside">
    <AppraisalPage class="titlePage" :firstPage="true" >
      <h1 v-html="lineBreaks(appraisal.documentTitle)"></h1>

      <div v-if="appraisal.preparedFor">
        <b class="headline">Prepared For:</b>
        <div v-html="lineBreaks(appraisal.preparedFor)" />
      </div>

      <div v-if="appraisal.valuationDate">
        <b>Effective Valuation Date:</b> <span v-html="lineBreaks(appraisal.valuationDate.toString())" />
      </div>

      <div v-if="appraisal.preparer">
        <b class="headline">Prepared By:</b>
        <span v-html="lineBreaks(appraisal.preparer)" />
      </div>

      <div v-if="appraisal.preparationDate">
        <b>Issue Date of Report:</b> <span v-html="lineBreaks(appraisal.preparationDate.toString())" />
      </div>
    </AppraisalPage>
    <AppraisalPage>  
      <h1>Table of Contents</h1>
      <ul>
        <!--li v-for="item in sections"><a :href="`#${item.id}`">{{ item.title }}</a></li-->
      </ul>
    </AppraisalPage>
    <AppraisalPage v-for="(precedingPage, idx) in appraisal.precedingSections" :key="`preceding-page-${precedingPage.id}`">  
      <h1 :id="`precedingPage-${idx}`">{{ precedingPage.sectionTitle }}</h1>
      <div v-html="precedingPage.details?.html" />
    </AppraisalPage>
    <AppraisalPage class="appraisalSummaryPage">
      <AppraisalSummary :appraisal="appraisal" />
    </AppraisalPage>
    
    <AppraisalPage v-for="(appraisedArtwork, idx) in appraisal.appraisedArtworks" :key="`appraisedArtwork-${appraisedArtwork.id}`" class="appraisedArtworks">
      <h1 v-if="idx === 0" id="appraised-items">Appraised Items</h1>
      <ArtworkEntry :position="idx+1" :artwork="appraisedArtwork"  />
    </AppraisalPage>
    
    <AppraisalPage v-for="(followingPage) in appraisal.followingSections" :key="`following-page-${followingPage.id}`">
      <h1 id="`following-${idx}`">{{ followingPage.sectionTitle }}</h1>
      <div v-html="followingPage.details?.html" />
    </AppraisalPage>
  </div>
</template>

<style scoped>

.headline {
  display: block;
}



</style>