<script>
import { deleteKeuangan, useLoadkeuangan } from '@/firebase/Bendahara/KasCrud'
import { ref, computed } from 'vue'

import { toast } from 'vue3-toastify'

export default {
  setup() {
    const keuangan = useLoadkeuangan()
    const currentPage = ref(1)
    const pageSize = 3

    const paginatedKeuangan = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return keuangan.value.slice(start, start + pageSize)
    })

    const totalPages = computed(() => {
      return Math.ceil(keuangan.value.length / pageSize)
    })

    function goToPage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    function hapusKeuangan(id) {
      setTimeout(() => {
        deleteKeuangan(id)
      }, 1000)
      toast.success('Berhasil menghapus user')
    }

    return { keuangan, paginatedKeuangan, currentPage, totalPages, goToPage, hapusKeuangan, deleteKeuangan }
  },
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-10 p-5 bg-white dark:bg-foreground rounded-xl shadow-md">
    <div class="text-white">
      <p class="text-xl font-bold">List Keuangan</p>
      <hr />
    </div>
    <table class="border border-white mt-5">
      <thead>
        <tr class="border border-white text-white">
          <th>Aksi</th>
          <th class="border border-white p-2">Tanggal</th>
          <th class="border border-white p-2">Nama</th>
          <th class="border border-white p-2">Jumlah</th>
          <th class="border border-white p-2">Kategori</th>
          <th class="border border-white p-2">Deskripsi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, tanggal, nama, jumlah, kategori, deskripsi } in paginatedKeuangan" :key="id" class="text-white">
          <td class="p-2 border-b-2 border-white">
            <div class="flex gap-2">
              <router-link :to="`/keuangan-edit/${id}`">
                <button class="cursor-pointer">
                  <v-icon name="hi-pencil-alt" scale="1" class="text-green-500" />
                </button>
              </router-link>
              <button class="cursor-pointer" @click="hapusKeuangan(id)">
                <v-icon name="md-deleteforever" scale="1" class="text-red-500" />
              </button>
            </div>
          </td>
          <td class="p-2 border border-white">{{ tanggal }}</td>
          <td class="p-2 border border-white">{{ nama }}</td>
          <td class="p-2 border border-white">Rp{{ jumlah.toLocaleString('id-ID') }}</td>
          <td class="p-2 border border-white">{{ kategori }}</td>
          <td class="p-2 border border-white">{{ deskripsi }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-5">
      <div class="mt-2 gap-2 flex">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 rounded',
            page === currentPage ? 'bg-primary text-white' : 'bg-gray-200',
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
