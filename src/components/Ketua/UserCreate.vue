<script>
import { createUser } from '@/firebase/Ketua/UsersCrud'
import { reactive } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  setup() {
    const form = reactive({ name: '', username: '', pass: '', role: '' })
    const onSubmit = async () => {
      try {
        await createUser({ ...form })
        form.name = ''
        form.username = ''
        form.pass = ''
        form.role = ''
        toast.success('Data berhasil disimpan!')
      } catch (error) {
        toast.error('Gagal Menyimpan Data')
        console.log(error)
      }
    }

    return { form, onSubmit }
  },
}
</script>

<template class="">
  <div class="md:w-[600px] my-5 mt-10 p-6 bg-foreground rounded-xl shadow-md">
    <div class="text-white mb-5">
      <p class="text-xl font-bold">Tambah User</p>
      <hr />
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6" autocomplete="off">
      <div class="flex gap-5">
        <div class="flex-1">
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Nama
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div class="flex-1">
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Username
          </label>
          <input
            id="username"
            v-model="form.username"
            type="username"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <div class="flex gap-5">
        <div class="flex-1">
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Password
          </label>
          <input
            id="password"
            v-model="form.pass"
            type="password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div class="flex-1">
          <label for="divisi" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Divisi
          </label>
          <select
            v-model="form.role"
            id="divisi"
            class="text-white dark:bg-gray-700 mt-1 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
          >
            <option value="" disabled>Pilih Divisi</option>
            <option value="Wakil ">Wakil</option>
            <option value="Sekretaris 1 ">Sekretaris</option>
            <option value="Bendahara">Bendahara</option>
            <option value="Kepala Divisi Aset IT">Kepala Divisi Aset IT</option>
            <option value="Staf Aset IT">Staf Aset IT</option>
            <option value="Kepala Divisi Humas">Kepala Divisi Humas</option>
            <option value="Staf Humas">Staf Humas</option>
            <option value="Kepala Divisi Litbang">Kepala Divisi Litbang</option>
            <option value="Staf Litbang">Staf Litbang</option>
            <option value="Kepala Divisi MSDM">Kepala Divisi MSDM</option>
            <option value="Staf MSDM">Staf MSDM</option>
            <option value="Kepala Divisi Pengembang Akademik">
              Kepala Divisi Pengembang Akademik
            </option>
            <option value="Staf Pengembang Akademik">Staf Pengembang Akademik</option>
          </select>
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
