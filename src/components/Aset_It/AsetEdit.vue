<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getInventori, updateInventori } from '@/firebase/Aset_It/AsetCrud'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const inventoriId = computed(() => route.params.id)

    const form = reactive({
      tanggal: '',
      nama_barang: '',
      stok: '',
      kategori: '',
      status_barang: '',
      deskripsi: '',
    })

    onMounted(async () => {
      const inventori = await getInventori(inventoriId.value)
      const date = new Date()
      form.tanggal = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(date)
      form.nama_barang = inventori.nama_barang
      form.stok = inventori.stok
      form.kategori = inventori.kategori
      form.status_barang = inventori.status_barang
      form.deskripsi = inventori.deskripsi
    })

    const update = async () => {
      try {
        await updateInventori(inventoriId.value, { ...form })
        toast.success('Berhasil update inventori')
        setTimeout(() => {
          router.push('/bendahara/inventori')
        }, 2000)
      } catch (error) {
        console.log(error)
      }
    }
    return { form, update }
  },
}
</script>
<template>
  <div class="p-5">
    <a href="/aset-it/inventori" class="text-white hover:text-primary ease-in-out duration-300 flex gap-2 items-center  group "><v-icon name="md-keyboardbackspace-sharp" class="text-white group-hover:text-primary"/> Kembali</a>
    <div class="md:w-[600px] my-5 mt-10 p-6 bg-foreground rounded-xl shadow-md">
      <div class="text-white mb-5">
        <p class="text-xl font-bold">Tambah Data inventori</p>
        <hr />
      </div>
      <form @submit.prevent="update" class="space-y-6" autocomplete="off">
        <div class="flex gap-5">
          <div class="flex-1">
            <label
              for="Nama Barang"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Nama Barang
            </label>
            <input
              id="Nama Barang"
              v-model="form.nama_barang"
              type="text"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div class="flex-1">
            <label for="stok" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
              stok
            </label>
            <input
              id="stok"
              v-model="form.stok"
              type="number"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <div class="flex gap-5">
          <div class="flex-1">
            <label
              for="kategori"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Kategori
            </label>
            <select
              v-model="form.kategori"
              id="kategori"
              class="text-white dark:bg-gray-700 mt-1 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
            >
              <option value="" disabled>Pilih kategori</option>
              <option value="Perlengkapan Kantor & Administrasi">
                Perlengkapan Kantor & Administrasi
              </option>
              <option value="Barang Konsumsi Kegiatan">Barang Konsumsi Kegiatan</option>
              <option value="Dokumentasi & Publikasi">Dokumentasi & Publikasi</option>
              <option value="Kebersihan">Kebersihan</option>
            </select>
          </div>
          <div class="flex-1">
            <label
              for="kategori"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Status Barang
            </label>
            <select
              v-model="form.status_barang"
              id="status_barang"
              class="text-white dark:bg-gray-700 mt-1 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Baik">Baik</option>
              <option value="Kurang Baik">Kurang Baik</option>
              <option value="Rusak">Rusak</option>
              <option value="Dipinjam">Dipinjam</option>
            </select>
          </div>
        </div>
        <div class="flex gap-5">
          <div class="flex-1">
            <label
              for="deskripsi"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
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
  </div>
</template>
