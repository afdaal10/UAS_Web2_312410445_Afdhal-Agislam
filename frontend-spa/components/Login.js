const Login = {
  template: `
    <div class="min-h-screen flex" style="background: linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 100%);">
      <!-- Left Panel -->
      <div class="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white">
        <div class="text-6xl mb-6">📦</div>
        <h1 class="text-4xl font-bold mb-3">E-Inventory</h1>
        <p class="text-blue-200 text-center text-lg max-w-sm">Sistem manajemen inventaris modern untuk bisnis yang lebih efisien.</p>
        <div class="mt-10 grid grid-cols-2 gap-4 w-full max-w-sm">
          <div class="bg-white bg-opacity-10 rounded-2xl p-4 text-center">
            <p class="text-2xl font-bold">99%</p>
            <p class="text-blue-200 text-sm">Akurasi Data</p>
          </div>
          <div class="bg-white bg-opacity-10 rounded-2xl p-4 text-center">
            <p class="text-2xl font-bold">24/7</p>
            <p class="text-blue-200 text-sm">Akses Kapanpun</p>
          </div>
        </div>
      </div>
      <!-- Right Panel -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div class="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <div class="lg:hidden text-center mb-6">
            <span class="text-4xl">📦</span>
            <h1 class="text-2xl font-bold text-blue-800 mt-2">E-Inventory</h1>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-1">Selamat Datang</h2>
          <p class="text-gray-400 text-sm mb-8">Masuk ke panel administrator</p>

          <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
            <span>⚠️</span> {{ errorMsg }}
          </div>

          <div class="mb-5">
            <label class="block text-sm font-semibold text-gray-600 mb-2">Email</label>
            <input v-model="email" type="email" placeholder="admin@einventory.com"
              class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
          </div>
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-600 mb-2">Password</label>
            <input v-model="password" type="password" placeholder="••••••••"
              class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
          </div>

          <button @click="login" :disabled="loading"
            class="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all disabled:opacity-50"
            style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f);">
            {{ loading ? '⏳ Memproses...' : 'Masuk ke Dashboard' }}
          </button>

          <div class="text-center mt-6">
            <router-link to="/" class="text-sm text-blue-400 hover:text-blue-600 transition-colors">← Kembali ke Beranda</router-link>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return { email: '', password: '', errorMsg: '', loading: false }
  },
  methods: {
    async login() {
      this.loading = true; this.errorMsg = '';
      try {
        const res = await axios.post('http://localhost/backend-api/public/api/login', {
          email: this.email, password: this.password
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.$router.push('/dashboard');
      } catch (e) {
        this.errorMsg = 'Email atau password salah!';
      } finally {
        this.loading = false;
      }
    }
  }
};