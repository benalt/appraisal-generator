<script setup lang="ts">
import type { Artwork } from '@/model/Artwork';

defineProps<{
  artwork: Artwork,
  position: number
}>()

</script>

<template>
  <div class="appraised-artwork">
    <div class="numbers">
      <span v-if="artwork.inventoryNumber">{{ artwork.inventoryNumber }}</span>
      <span v-else>{{ position }}</span>
    </div>
    <div class="title">
      <h2><span v-html="artwork.artist?.artistName"></span> <i>{{ artwork.title }}</i>, {{ artwork.year }}</h2>
      <span v-if="artwork.appraisedValue" class="appraisalValue">{{ artwork.appraisedValueRangeHtml }}</span>
    </div>
    
    <div class="details">
      
      <ul>
        <li v-if="artwork.artist"><b>Artist/Maker:</b> <span v-html="artwork.artist?.labelHtml" /></li>
        <li v-if="artwork.signature"><b>Signature:</b> {{ artwork.signature }}</li>
        <li v-if="artwork.style"><b>Style:</b> {{ artwork.style }}</li>
        <li v-if="artwork.medium"><b>Medium:</b> {{ artwork.medium }}</li>
        <li v-if="artwork.dimensions"><b>Dimensions:</b> {{ artwork.dimensions }}</li>
        <li v-if="artwork.condition"><b>Condition:</b> {{ artwork.condition }}</li>
        <li v-if="artwork.frameNote"><b>FrameNote</b> {{ artwork.frameNote }}</li>

        <li v-if="artwork.edition"><b>FrameNote</b> {{ artwork.edition }}</li>
        <li v-if="artwork.printer"><b>FrameNote</b> {{ artwork.printer }}</li>
        <li v-if="artwork.publisher"><b>FrameNote</b> {{ artwork.publisher }}</li>
        
      </ul>
      <div v-if="artwork.provenance">
        <b>Provenance</b>
        <div v-html="artwork.provenance.html" class="noSpace" />
      </div>
    </div>
    <div class="image">
      <img :src="artwork.images[0]?.url" :alt="artwork.images[0]?.title"/>
    </div>

    <div class="textSection">

      <div v-if="artwork.exhibited" class="noSpace">
        <b>Exhibited</b>
        <div v-html="artwork.exhibited.html" />
      </div>

      <div v-if="artwork.literature" class="noSpace">
        <b>Literature</b>
        <div v-html="artwork.literature.html" />
      </div>

      <div v-if="artwork.description" class="noSpace">
        <b>Description</b>
        <div v-html="artwork.description.html" />
      </div>

      <div v-if="artwork.footnotes" class="footnotes">
        <b>footnotes</b>
        <div v-html="artwork.footnotes.html" />
      </div>

    </div>
    <h2 class="subtitle" v-if="artwork.supportingArtworks.length > 0">Supporting Valuations</h2>  
    <div class="supportingArtwork" v-for="(supportingArtwork, idx2) in artwork.supportingArtworks" :key="`suporting-artwork-${supportingArtwork.id}`">  
      

      <div class="details">
        <h3>{{ supportingArtwork.title }}</h3>
        <div v-html="supportingArtwork.details?.html" />
      </div>
      
      <div class="image supportingImage">
        <img :src="supportingArtwork.images[0]?.url" :alt="supportingArtwork.images[0]?.title"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

.appraised-artwork,
.supportingArtwork {
  display: grid;
  grid-template-columns: .25in 1fr 2.5in;
  column-gap: 20px;
}

.numbers {
  font-size: 1.5rem;
  text-align: right;
  font-weight: bold;
}

.title,
.subtitle {
  grid-column-start: 2;
  grid-column-end: span 3;
  border-bottom: 1px solid #333;
  
}

.title {
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: 2rem;
  grid-column-end: 2 span;
}

.appraisalValue {
  font-weight: bold;
  font-size: 1.5rem;
}

.details {
  grid-column-start: 2;
}

.details ul {
  list-style-type: none;
  padding: 0;
}

.noSpace >>> p,
.noSpace >>> ul,
.noSpace >>> ol {
  margin-bottom: .6rem;
  line-height: 1.2;
}

.image {
  text-align: right;
  grid-column-start: 3;
}

.image img {
  display: inline;
  max-width: 100%;
}

.footnotes {
  border-top: 1px solid #333;
}

.supportingImage {
  text-align: right;
}

.supportingArtwork {
  grid-column-start: 1;
  grid-column-end: span 3;
}

.appraised-artwork > hr {
  grid-column-start: 1;
  grid-column-end: span 3;
}

.appraised-artwork > .textSection,
.appraised-artwork > .subtitle,
.appraised-artwork > hr,
.appraised-artwork > .supporting-artworks  {
  grid-column-start: 2;
  grid-column-end: span 2;
}


</style>