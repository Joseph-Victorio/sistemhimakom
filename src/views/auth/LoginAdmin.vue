<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useLoadUsers } from '@/firebase/Ketua/UsersCrud'
import bcrypt from 'bcryptjs'

export default {
  setup() {
    const users = useLoadUsers()
    const username = ref('')
    const password = ref('')
    const router = useRouter()

    const login = async () => {
      const user = users.value.find((u) => u.username === username.value)

      if (!user) {
        alert('Username tidak ditemukan!')
        return
      }

      const passwordMatch = await bcrypt.compare(password.value, user.password)

      if (!passwordMatch) {
        alert('Password salah!')
        return
      }

     
      localStorage.setItem(
        'userSession',
        JSON.stringify({ username: user.username, role: user.role }),
      )

     
      if (user.role === 'Bendahara') {
        router.push('/bendahara/dashboard')
      } 
      else if (user.role === 'Ketua') {
        router.push('/ketua/dashboard')
      } 
      else if (user.role === 'Sekretaris'){
        router.push('/sekretaris/dashboard')
      } 
      else if(user.role === 'Kepala Divisi Aset IT' || user.role === 'Staff Aset IT'){
        router.push('/aset-it/dashboard')
      }
      else {
        router.push('/')
      }
    }

    return { users, username, password, login }
  },
}
</script>

<template>
  <div class="bg-background flex gap-5 p-10 w-full h-screen items-center">
    <div class="w-[50%]">
      <img src="/LOGO_HIMAKOM_NOBG.png" alt="" class="w-[500px] mx-auto" />
    </div>
    <!-- form nya -->
    <div class="font-oswald w-[50%]">
      <p class="text-center text-tulisan text-3xl">Welcome, Please Login</p>
      <br />
      <br />
      <form action="" method="post" class="text-tulisan w-full">
        <p>Username</p>
        <input
          type="text"
          placeholder="Username"
          class="outline-none border-tulisan border-2 px-6 py-2 rounded-xl w-full"
        />
        <br />
        <br />
        <p>Password</p>
        <input
          type="password"
          placeholder="Password"
          class="outline-none border-tulisan border-2 px-6 py-2 rounded-xl w-full"
        />
        <br /><br />
        <button
          class="text-center font-bold bg-primary w-full py-2 rounded-xl cursor-pointer hover:bg-hover transition duration-300 ease-in-out"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
