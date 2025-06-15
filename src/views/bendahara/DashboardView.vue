<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import BendaharaNav from '@/components/BendaharaNav.vue'

const totalKas = ref(0)
const totalPengeluaran = ref(0)
const totalPemasukan = ref(0)
const isInView = ref(false) 
const sectionRef = ref(null) 


const animateValue = (target, value, duration = 2) => {
  gsap.to(target, {
    duration: duration,
    value: value,
    roundProps: 'value',
    ease: 'power2.out',
    onUpdate: () => {
      target.value = Math.round(target.value)
    },
  })
}


const observeSection = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isInView.value) {
        isInView.value = true // Mark as viewed
        animateValue(totalKas, 15000000)
        animateValue(totalPengeluaran, 150000)
        animateValue(totalPemasukan, 250000)
      }
    },
    { threshold: 0.3 }, 
  )
  observer.observe(sectionRef.value)
}


onMounted(() => {
  observeSection()
})
</script>

<template>
  <div ref="sectionRef" class="font-oswald p-4 sm:p-6 md:p-10 text-tulisan">
    <!-- Greeting -->
    <div class="text-left mb-5">
      <p class="text-2xl sm:text-3xl">Welcome User</p>
      <p class="text-sm sm:text-base">03/04/2025</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-5">
      <!-- Left: Summary Cards -->
      <div class="flex-1 w-full">
        <!-- Total Kas -->
        <div class="bg-foreground p-5 rounded-2xl mb-5">
          <div class="flex items-center gap-5 sm:gap-10 flex-wrap">
            <v-icon name="gi-money-stack" class="text-5xl" scale="5" />
            <p class="text-3xl sm:text-5xl">Rp {{ totalKas.toLocaleString('id-ID') }}</p>
          </div>
          <p class="text-lg sm:text-xl mt-2">Total Keuangan HIMAKOM</p>
        </div>

        <!-- Grid: Pemasukan & Pengeluaran -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div class="bg-foreground p-4 sm:p-5 rounded-xl">
            <v-icon name="gi-pay-money" scale="3" />
            <p class="text-2xl sm:text-3xl">Rp {{ totalPengeluaran.toLocaleString('id-ID') }}</p>
            <p class="text-sm sm:text-base mt-1">Total Pengeluaran Uang Kas Hari Ini</p>
          </div>

          <div class="bg-foreground p-4 sm:p-5 rounded-xl">
            <v-icon name="gi-receive-money" scale="3" />
            <p class="text-2xl sm:text-3xl">Rp {{ totalPemasukan.toLocaleString('id-ID') }}</p>
            <p class="text-sm sm:text-base mt-1">Total Pemasukan Uang Kas Hari Ini</p>
          </div>

          <div class="bg-foreground p-4 sm:p-5 rounded-xl">
            <v-icon name="gi-receive-money" scale="3" />
            <p class="text-2xl sm:text-3xl">Rp {{ totalPemasukan.toLocaleString('id-ID') }}</p>
            <p class="text-sm sm:text-base mt-1">Total Pemasukan Uang Kas Hari Ini</p>
          </div>

          <div class="bg-foreground p-4 sm:p-5 rounded-xl">
            <v-icon name="gi-receive-money" scale="3" />
            <p class="text-2xl sm:text-3xl">Rp {{ totalPemasukan.toLocaleString('id-ID') }}</p>
            <p class="text-sm sm:text-base mt-1">Total Pemasukan Uang Kas Hari Ini</p>
          </div>
        </div>
      </div>

      <!-- Right: Log & History -->
      <div class="flex-1 flex flex-col gap-4 w-full">
        <!-- Log Aktivitas -->
        <div>
          <p class="text-2xl sm:text-3xl mb-2">Log Aktivitas</p>
          <div class="bg-foreground p-5 rounded-xl w-full">
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
              <p>hari-bulan-tahun</p>
              <p>User telah menambahkan data</p>
            </div>
          </div>
        </div>

        <!-- Histori Menabung -->
        <div>
          <p class="text-2xl sm:text-3xl mb-2">Histori menabung</p>
          <div class="bg-foreground p-5 rounded-xl w-full">
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-5">
              <p>hari-bulan-tahun</p>
              <p>User telah menabung sekian jumlah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BendaharaNav />
</template>


