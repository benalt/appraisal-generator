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
      {{position}}
      <span v-if="artwork.inventoryNumber">{{ artwork.inventoryNumber }}</span>
    </div>
    <div class="details">
      <h2><span v-html="artwork.artist?.artistName"></span> <i>{{ artwork.title }}</i>, {{ artwork.year }}</h2>
    
      <ul>
        <li v-if="artwork.signature"><b>Signature:</b>{{ artwork.signature }}</li>
        <li v-if="artwork.style"><b>Style:</b>{{ artwork.style }}</li>
        <li v-if="artwork.medium"><b>Medium:</b>{{ artwork.medium }}</li>
        <li v-if="artwork.dimensions"><b>Dimensions:</b>{{ artwork.dimensions }}</li>
        <li v-if="artwork.condition"><b>Condition:</b>{{ artwork.condition }}</li>
        <li v-if="artwork.frameNote"><b>FrameNote</b>{{ artwork.frameNote }}</li>
        <li v-if="artwork.appraisedValue"><b>Appraised Value:</b>{{ artwork.appraisedValue }}</li>
      </ul>
    </div>
    <div class="image">
      <img :src="artwork.images[0]?.url" :alt="artwork.images[0]?.title"/>
    </div>

    <div class="textSection">
      <div v-if="artwork.provenance">
        <h3>Provenance</h3>
        <div v-html="artwork.provenance.html" />
      </div>

      <div v-if="artwork.exhibited">
        <h3>Exhibited</h3>
        <div v-html="artwork.exhibited.html" />
      </div>

      <div v-if="artwork.literature">
        <h3>Literature</h3>
        <div v-html="artwork.literature.html" />
      </div>

      <div v-if="artwork.description">
        <h3>Description</h3>
        <div v-html="artwork.description.html" />
      </div>
    </div>
  
    <h3 class="subtitle" v-if="artwork.supportingArtworks.length > 0">Supporting Valuations</h3>
    <template v-for="(supportingArtwork, idx2) in artwork.supportingArtworks" :key="`suporting-artwork-${supportingArtwork.id}`" class="supporting-artworks">  
      <div class="numbers">{{ position }} - {{ idx2 + 1 }}</div>

      <div class="details">
        <h4>{{ supportingArtwork.title }}</h4>
        <div v-html="supportingArtwork.details.html" />
      </div>
      
      <div class="image">
        <img :src="supportingArtwork.images[0]?.url" :alt="supportingArtwork.images[0]?.title"/>
      </div>
    </template>

  </div>
</template>

<style scoped>

.appraised-artwork {
  display: grid;
  grid-template-columns: auto 1fr 200px;
  column-gap: 20px;
}

.appraised-artwork > .numbers {}
.appraised-artwork > .details {}

.appraised-artwork > .image {
  width: 100%;
  height: auto;
}

.image img {
  max-width: 100%;
}


.appraised-artwork > .textSection,
.appraised-artwork > .subtitle,
.appraised-artwork > .supporting-artworks  {
  grid-column-start: 2;
  grid-column-end: span 2;
}


</style>