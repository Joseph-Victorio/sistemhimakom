<script>
import { ref, computed } from 'vue'
import { useLoadUsers, deleteUser } from '@/firebase/Ketua/UsersCrud'
import { toast } from 'vue3-toastify'

export default {
  setup() {
    const users = useLoadUsers()
    const currentPage = ref(1)
    const pageSize = 3

    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return users.value.slice(start, start + pageSize)
    })

    const totalPages = computed(() => {
      return Math.ceil(users.value.length / pageSize)
    })

    function goToPage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    function hapusUser(id){
      setTimeout(()=>{
        deleteUser(id)
      }, 1000)
      toast.success("Berhasil menghapus user")
    }

    return { users, paginatedUsers, currentPage, totalPages, goToPage,hapusUser, deleteUser }
  },
}
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10 p-5 bg-white dark:bg-foreground rounded-xl shadow-md">
    <div class="text-white">
      <p class="text-xl font-bold">List User</p>
      <hr />
    </div>
    <table class="w-xl border border-white mt-5">
      <thead>
        <tr class="border border-white text-white">
          <th>Aksi</th>
          <th class="border border-white p-2">Nama</th>
          <th class="border border-white p-2">Username</th>
          <th class="border border-white p-2">Divisi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{ id, name, username, role } in paginatedUsers"
          :key="id"
          class="text-white text-center"
        >
          <td class="p-2   border-b-2 border-white">
            <div class="flex gap-2 justify-center">
              <router-link :to="`/user-edit/${id}`">
                <button class="cursor-pointer">
                  <v-icon name="hi-pencil-alt" scale="1" class="text-green-500" />
                </button>
              </router-link>
              <button class="cursor-pointer" @click="hapusUser(id)">
                <v-icon name="md-deleteforever" scale="1" class="text-red-500" />
              </button>
            </div>
          </td>
          <td class="p-2 border border-white">{{ name }}</td>
          <td class="p-2 border border-white">{{ username }}</td>
          <td class="p-2 border border-white">{{ role }}</td>
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
