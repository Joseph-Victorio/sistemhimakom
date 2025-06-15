<script setup >
import CreateKas from '@/components/Bendahara/CreateKas.vue';
import KeuanganList from '@/components/Bendahara/KeuanganList.vue';
import BendaharaNav from '@/components/BendaharaNav.vue';

</script>

<template>
  <BendaharaNav/>
  <div class="dark:bg-background font-oswald">
    <div class="flex md:flex-row flex-col gap-2 p-5 mx-auto justify-center">
      <CreateKas/>
      <KeuanganList/>
    </div>
  </div>
</template>
