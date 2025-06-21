<script>
import { getArsip, updateArsip } from '@/firebase/Sekretaris/SekretarisCrud'
import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    const arsipId = computed(() => route.params.id)

    const form = reactive({
      tanggal: '',
      judul_surat: '',
      nomor_surat: '',
      file_dokumen: '',
      tipe_surat: '',
      deskripsi: '',
    })

    onMounted(async () => {
      const arsip = await getArsip(arsipId.value)

      const date = new Date()

      form.tanggal = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(date)
      form.judul_surat = arsip.judul_surat
      form.nomor_surat = arsip.nomor_surat
      form.file_dokumen = arsip.file_dokumen
      form.tipe_surat = arsip.tipe_surat
      form.deskripsi = arsip.deskripsi
    })
    const update = async () => {
      try {
        await updateArsip(arsipId.value, { ...form })
        toast.success('Berhasil update data!')
        setTimeout(() => {
          router.push('/sekretaris/arsip')
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
    <a
      href="/sekretaris/arsip"
      class="text-white hover:text-primary ease-in-out duration-300 flex gap-2 items-center group"
      ><v-icon name="md-keyboardbackspace-sharp" class="text-white group-hover:text-primary" />
      Kembali</a
    >
    <div class="md:w-[600px] my-5 mt-10 p-6 bg-foreground rounded-xl shadow-md">
      <div class="text-white mb-5">
        <p class="text-xl font-bold">Edit Data Arsip</p>
        <hr />
      </div>
      <form @submit.prevent="update" class="space-y-6" autocomplete="off">
        <div class="flex gap-5">
          <div class="flex-1">
            <label
              for="judul_surat"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Judul Surat
            </label>
            <input
              id="judul_surat"
              v-model="form.judul_surat"
              type="text"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div class="flex-1">
            <label
              for="nomor_surat"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Nomor Surat
            </label>
            <input
              id="nomor_surat"
              v-model="form.nomor_surat"
              type="text"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <div class="flex-1">
          <label
            for="file_dokumen"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Lokasi Surat Disimpan
          </label>
          <input
            id="file_dokumen"
            v-model="form.file_dokumen"
            type="text"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div class="flex gap-5">
          <div class="flex-1">
            <label
              for="kategori"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Tipe Surat
            </label>
            <select
              v-model="form.tipe_surat"
              id="tipe_surat"
              class="text-white dark:bg-gray-700 mt-1 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
            >
              <option value="" disabled>Pilih Tipe Surat</option>
              <option value="Surat Pemberitahuan Acara (SPA)">
                Surat Pemberitahuan Acara (SPA)
              </option>
              <option value="Surat Permohonan Dana (SPD)">Surat Permohonan Dana (SPD)</option>
              <option value="Surat Peminjaman Sarana dan Prasarana (SPSP)">
                Surat Peminjaman Sarana dan Prasarana (SPSP)
              </option>
              <option value="Surat Perubahan Waktu Kegiatan (SPWK)">
                Surat Perubahan Waktu Kegiatan (SPWK)
              </option>
              <option value="Surat Dispensasi (SD)">Surat Dispensasi (SD)</option>
              <option value="Surat Undangan (SU)">Surat Undangan (SU)</option>
              <option value="Surat Laporan Pertanggung Jawaban (SLPJ)">
                Surat Laporan Pertanggung Jawaban (SLPJ)
              </option>
              <option value="Surat Permohonan Dana Insentif (SPDI)">
                Surat Permohonan Dana Insentif (SPDI)
              </option>
              <option value="Surat Laporan Pertanggung Jawaban (SLPJ)">
                Surat Permohonan Point SKPI (SPSKPI)
              </option>
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
