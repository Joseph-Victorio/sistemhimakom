<script setup>
import SekretarisCreate from '@/components/Sekretaris/SekretarisCreate.vue';
import SekretarisList from '@/components/Sekretaris/SekretarisList.vue';
import SekretarisNav from '@/components/SekretarisNav.vue';

</script>
<template>
  <SekretarisNav/>
  <div class="dark:bg-background font-oswald">
    <div class="flex md:flex-row flex-col gap-2 p-5 mx-auto items-start">
     <SekretarisCreate/>
      <SekretarisList/>
    </div>
  </div>
</template>
