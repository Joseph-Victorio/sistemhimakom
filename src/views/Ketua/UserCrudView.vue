<script setup>
import UserCreate from '@/components/Ketua/UserCreate.vue'
import UserList from '@/components/Ketua/UserList.vue'
import KetuaNav from '@/components/KetuaNav.vue';
</script>
<template>
  <KetuaNav/>
  <div class="dark:bg-background font-oswald">
    <div class="flex md:flex-row flex-col gap-2 p-5 mx-auto justify-center">
      <UserCreate />
      <UserList />
    </div>
  </div>
</template>
