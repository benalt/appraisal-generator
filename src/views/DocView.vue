<script setup lang="ts">
import AppraisalDoc from '@/components/AppraisalDoc.vue';
import html2pdf from "html2pdf.js";

function exportToPDF() {
  html2pdf(document.getElementById("appraisalDocInside"), {
    filename: "i-was-html.pdf",
    margin: .5,
    image: { type: 'jpeg', quality: 0.20 },
    html2canvas: { scale: 2,useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: {before: "hr", avoid: ['img', '.supporting-artworks', '.appraised-artwork', 'h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li'] }
  });
}

</script>

<template>
  <main>
    <div id="controls">
      <button @click="exportToPDF">Export PDF</button>
    </div>
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
  width: 8.5in;
  margin: 0 auto;
  padding: .5in;
  background: #fff;
}
</style>



