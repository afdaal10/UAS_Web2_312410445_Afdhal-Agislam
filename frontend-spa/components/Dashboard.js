const Dashboard = {
  template: `
    <div class="min-h-screen bg-gray-50 flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col fixed top-0 left-0 h-full">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📦</span>
            <span class="font-bold text-gray-800 text-lg">E-Inventory</span>
          </div>
        </div>
        <nav class="p-4 flex-1">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Menu</p>
          <ul class="space-y-1">
            <li><router-link to="/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white shadow-sm" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">🏠 Dashboard</router-link></li>
            <li><router-link to="/items" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800">📦 Barang</router-link></li>
            <li><router-link to="/categories" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800">🗂 Kategori</router-link></li>
            <li><router-link to="/suppliers" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800">🏭 Supplier</router-link></li>
            <li><router-link to="/stock-history" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800">📋 Histori Stok</router-link></li>
          </ul>
        </nav>
        <div class="p-4 border-t border-gray-100">
          <div class="flex items-center gap-3 px-3 py-2">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">{{ userName.charAt(0) }}</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-700 truncate">{{ userName }}</p>
              <p class="text-xs text-gray-400">Administrator</p>
            </div>
            <button @click="logout" class="text-gray-400 hover:text-red-500 text-lg" title="Logout">⏏</button>
          </div>
        </div>
      </aside>
      <!-- Main -->
      <div class="flex-1 flex flex-col ml-64">
        <header class="bg-white border-b border-gray-100 px-8 py-4">
          <h1 class="text-xl font-bold text-gray-800">Dashboard</h1>
          <p class="text-sm text-gray-400">Ringkasan data inventaris</p>
        </header>
        <main class="flex-1 p-8">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div v-for="card in cards" :key="card.label" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div class="flex items-center justify-between mb-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl" :class="card.bg">{{ card.icon }}</div>
                <span class="text-xs font-semibold px-2 py-1 rounded-full" :class="card.badge">+0%</span>
              </div>
              <p class="text-3xl font-bold text-gray-800">{{ card.value }}</p>
              <p class="text-sm text-gray-400 mt-1">{{ card.label }}</p>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 class="font-bold text-gray-700 mb-1">Selamat Datang! 👋</h2>
            <p class="text-gray-400 text-sm">Gunakan menu di sidebar untuk mengelola data inventaris.</p>
          </div>
        </main>
      </div>
    </div>
  `,
  data() {
    return {
      userName: JSON.parse(localStorage.getItem('user') || '{}').name || 'Admin',
      cards: [
        { icon: '📦', label: 'Total Barang',  value: 0, bg: 'bg-blue-50',   badge: 'bg-blue-50 text-blue-600' },
        { icon: '🗂',  label: 'Kategori',      value: 0, bg: 'bg-green-50',  badge: 'bg-green-50 text-green-600' },
        { icon: '🏭', label: 'Supplier',       value: 0, bg: 'bg-yellow-50', badge: 'bg-yellow-50 text-yellow-600' },
        { icon: '📋', label: 'Transaksi Stok', value: 0, bg: 'bg-purple-50', badge: 'bg-purple-50 text-purple-600' },
      ]
    }
  },
  async mounted() {
    const B = 'http://localhost/backend-api/public/api';
    try {
      const [a,b,c,d] = await Promise.all([axios.get(`${B}/items`), axios.get(`${B}/categories`), axios.get(`${B}/suppliers`), axios.get(`${B}/stock-history`)]);
      this.cards[0].value = a.data.length; this.cards[1].value = b.data.length;
      this.cards[2].value = c.data.length; this.cards[3].value = d.data.length;
    } catch(e) {}
  },
  methods: {
    logout() { localStorage.clear(); this.$router.push('/login'); }
  }
};