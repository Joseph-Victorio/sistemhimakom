<script setup>
import { ref } from 'vue';

const navVisible = ref(false);

const toggleNav = () => {
  navVisible.value = !navVisible.value;
};
</script>

<template>
  <div class="relative z-50 ">
    <!-- Wrapper Button + Nav -->
    <div
      @click="toggleNav"
      class="fixed bottom-2 left-1/2 transform -translate-x-1/2 flex items-center bg-black/40 text-white px-3 py-2 rounded-full shadow-lg transition-all duration-300 cursor-pointer hover:shadow-primary "
      :class="[
        navVisible ? 'w-[280px]' : 'w-[60px]',
        'justify-center sm:justify-start'
      ]"
    >
      <!-- Logo -->
      <img
        src="/LOGO_HIMAKOM_NOBG.png"
        alt="Logo"
        class="w-10 transition-all duration-300"
        :class="navVisible ? 'mr-4' : ''"
      />

      <!-- Horizontal Nav Content -->
      <transition name="fade">
        <div
          v-if="navVisible"
          class="flex gap-4 items-center whitespace-nowrap overflow-x-auto"
        >
          <a href="/bendahara/dashboard" class="hover:text-primary transition-colors duration-300 ease-in-out">Dashboard</a>
          <a href="/bendahara/keuangan" class="hover:text-primary transition-colors duration-300 ease-in-out">Keuangan</a>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
