<script>
import { createKeuangan } from '@/firebase/Bendahara/KasCrud'

import { onMounted, reactive } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  setup() {
    const form = reactive({ tanggal: '', nama: '', jumlah: '', kategori: '', deskripsi: '' })

    onMounted(()=>{
      const date = new Date()

      form.tanggal = new Intl.DateTimeFormat('id-ID', {
        weekday : 'long',
        day : '2-digit',
        month : 'long',
        year : 'numeric',
      }).format(date)
    })

    const onSubmit = async () => {
      try {
        await createKeuangan({ ...form })
        form.tanggal = ''
        form.nama = ''
        form.jumlah = ''
        form.kategori = ''
        form.deskripsi = ''
        toast.success("Berhasil menambahkan data!")
      } catch (error) {
        console.log(error)
      }
    }

    return { form, onSubmit }
  },
}
</script>

<template>
  <div class="md:w-[600px] my-5 mt-10 p-6 bg-foreground rounded-xl shadow-md">
    <div class="text-white mb-5">
      <p class="text-xl font-bold">Tambah Data Keuangan</p>
      <hr />
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6" autocomplete="off">
      <div class="flex gap-5">
        <div class="flex-1">
          <label for="nama" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Nama
          </label>
          <input
            id="nama"
            v-model="form.nama"
            type="text"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div class="flex-1">
          <label for="jumlah" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Jumlah
          </label>
          <input
            id="jumlah"
            v-model="form.jumlah"
            type="number"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div class="flex-1">
          <label for="kategori" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Kategori
          </label>
          <select
            v-model="form.kategori"
            id="kategori"
            class="text-white dark:bg-gray-700 mt-1 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
          >
            <option value="" disabled>Pilih kategori</option>
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
            <option value="Uang Kas">Uang Kas</option>
           
          </select>
        </div>
      </div>
      <div class="flex gap-5">
        <div class="flex-1">
          <label for="deskripsi" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            v-model="form.deskripsi"
            type="text"
            required
            placeholder="Deskripsi"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>

        
      </div>

      <button
        type="submit"
        class="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary cursor-pointer hover:bg-hover"
      >
        Simpan
      </button>
    </form>
  </div>
</template>
