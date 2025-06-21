<script setup>
import AsetCreate from '@/components/Aset_It/AsetCreate.vue';
import AsetList from '@/components/Aset_It/AsetList.vue';
import AsetNav from '@/components/AsetNav.vue';

</script>

<template>
  <AsetNav/>
  <div class="dark:bg-background font-oswald">
    <div class="flex md:flex-row flex-col gap-2 p-5 mx-auto justify-center">
      <AsetCreate/>
     <AsetList/>
    </div>
  </div>
</template>