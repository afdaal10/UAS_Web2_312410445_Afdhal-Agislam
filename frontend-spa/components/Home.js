const Home = {
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm">
        <div class="flex items-center gap-3">
          <span class="text-2xl">📦</span>
          <span class="text-xl font-bold text-gray-800">E-Inventory</span>
        </div>
        <router-link to="/login"
          class="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all"
          style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f);">
          Login Admin
        </router-link>
      </nav>

      <div class="max-w-5xl mx-auto px-6 py-16">
        <div class="text-center mb-14">
          <span class="text-6xl">📦</span>
          <h1 class="text-4xl font-bold text-gray-800 mt-4 mb-3">Sistem Manajemen Inventaris</h1>
          <p class="text-gray-400 text-lg">Kelola barang, kategori, supplier, dan histori stok dengan mudah dan efisien.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-3">📦</div>
            <p class="text-3xl font-bold text-blue-600">{{ summary.items }}</p>
            <p class="text-gray-400 text-sm mt-1">Total Barang</p>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-2xl mx-auto mb-3">🗂</div>
            <p class="text-3xl font-bold text-green-600">{{ summary.categories }}</p>
            <p class="text-gray-400 text-sm mt-1">Kategori</p>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-2xl mx-auto mb-3">🏭</div>
            <p class="text-3xl font-bold text-yellow-600">{{ summary.suppliers }}</p>
            <p class="text-gray-400 text-sm mt-1">Supplier</p>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl mx-auto mb-3">📋</div>
            <p class="text-3xl font-bold text-purple-600">{{ summary.history }}</p>
            <p class="text-gray-400 text-sm mt-1">Transaksi</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/login"
            class="inline-block px-8 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
            style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f);">
            Masuk ke Panel Admin →
          </router-link>
        </div>
      </div>
    </div>
  `,
  data() {
    return { summary: { items: 0, categories: 0, suppliers: 0, history: 0 } }
  },
  async mounted() {
    try {
      const BASE = 'http://localhost/backend-api/public/api';
      const [items, cats, sups] = await Promise.all([
        axios.get(`${BASE}/items`), axios.get(`${BASE}/categories`), axios.get(`${BASE}/suppliers`)
      ]);
      this.summary.items = items.data.length;
      this.summary.categories = cats.data.length;
      this.summary.suppliers = sups.data.length;
    } catch(e) {}
  }
};