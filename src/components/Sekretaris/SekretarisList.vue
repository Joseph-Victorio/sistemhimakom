<script>
import { deleteArsip, useLoadArsip } from '@/firebase/Sekretaris/SekretarisCrud'
import { ref, computed } from 'vue'

import { toast } from 'vue3-toastify'

export default {
  setup() {
    const arsip = useLoadArsip()
    const currentPage = ref(1)
    const pageSize = 3
    const searchTerm = ref('')

    const filteredArsip = computed(() => {
      if (!searchTerm.value) return arsip.value
      const term = searchTerm.value.toLowerCase()
      return arsip.value.filter((item) =>
        Object.values(item).some((val) => String(val).toLowerCase().includes(term)),
      )
    })

    const paginatedarsip = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return filteredArsip.value.slice(start, start + pageSize)
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredArsip.value.length / pageSize)
    })

    function goToPage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    function hapusArsip(id) {
      setTimeout(() => {
        deleteArsip(id)
      }, 1000)
      toast.success('Berhasil menghapus data!')
    }

    return {
      arsip,
      searchTerm,
      filteredArsip,
      paginatedarsip,
      currentPage,
      totalPages,
      goToPage,
      hapusArsip,
      deleteArsip,
    }
  },
}
</script>

<template>
  <div class="max-w-full md:max-w-5xl mx-auto mt-10 p-5 bg-white dark:bg-foreground rounded-xl shadow-md">
    <div class="text-white">
      <p class="text-xl font-bold">List Arsip</p>
      <hr />
    </div>

    <div class="mb-4">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Cari arsip..."
        class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none mt-5 text-white"
      />
    </div>

    <!-- Responsive Table Wrapper -->
    <div class="overflow-x-auto">
      <table class="min-w-[800px] w-full border border-white mt-5">
        <thead>
          <tr class="border border-white text-white text-sm sm:text-md">
            <th class="p-2">Aksi</th>
            <th class="border border-white p-2">Tanggal</th>
            <th class="border border-white p-2">Lokasi File</th>
            <th class="border border-white p-2">judul_surat</th>
            <th class="border border-white p-2">nomor_surat</th>
            <th class="border border-white p-2">tipe_surat</th>
            <th class="border border-white p-2">Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{
              id,
              tanggal,
              file_dokumen,
              judul_surat,
              nomor_surat,
              tipe_surat,
              deskripsi,
            } in paginatedarsip"
            :key="id"
            class="text-white text-xs sm:text-sm text-center"
          >
            <td class="p-2 border-white">
              <div class="flex gap-2 justify-center">
                <router-link :to="`/sekretaris-edit/${id}`">
                  <button class="cursor-pointer">
                    <v-icon name="hi-pencil-alt" scale="1" class="text-green-500" />
                  </button>
                </router-link>
                <button class="cursor-pointer" @click="hapusArsip(id)">
                  <v-icon name="md-deleteforever" scale="1" class="text-red-500" />
                </button>
              </div>
            </td>
            <td class="p-2 border border-white w-[100px]">{{ tanggal }}</td>
            <td class="p-2 border border-white w-[100px]">
              <a
                :href="file_dokumen"
                target="_blank"
                class="cursor-pointer text-white hover:text-primary ease-in-out duration-300"
              >
                Lokasi File
              </a>
            </td>
            <td class="p-2 border border-white">{{ judul_surat }}</td>
            <td class="p-2 border border-white">{{ nomor_surat }}</td>
            <td class="p-2 border border-white">{{ tipe_surat }}</td>
            <td class="p-2 border border-white">{{ deskripsi }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-5">
      <div class=" gap-2 flex flex-wrap">
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

