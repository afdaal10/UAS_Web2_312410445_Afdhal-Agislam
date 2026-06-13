const StockHistory = {
  template: `
    <div class="min-h-screen bg-gray-50 flex">
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
            <li><router-link to="/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50">🏠 Dashboard</router-link></li>
            <li><router-link to="/items" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50">📦 Barang</router-link></li>
            <li><router-link to="/categories" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50">🗂 Kategori</router-link></li>
            <li><router-link to="/suppliers" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50">🏭 Supplier</router-link></li>
            <li><router-link to="/stock-history" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white shadow-sm" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">📋 Histori Stok</router-link></li>
          </ul>
        </nav>
        <div class="p-4 border-t border-gray-100">
          <div class="flex items-center gap-3 px-3 py-2">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">A</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-700">Administrator</p>
              <p class="text-xs text-gray-400">Admin</p>
            </div>
            <button @click="logout" class="text-gray-400 hover:text-red-500 text-lg">⏏</button>
          </div>
        </div>
      </aside>
      <div class="flex-1 flex flex-col ml-64">
        <header class="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 class="text-xl font-bold text-gray-800">Histori Stok</h1>
            <p class="text-sm text-gray-400">Riwayat transaksi masuk & keluar</p>
          </div>
          <button @click="openModal()" class="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">+ Catat Transaksi</button>
        </header>
        <main class="flex-1 p-8">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100">
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">No</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Barang</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tipe</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Jumlah</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Catatan</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Oleh</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(h, i) in history" :key="h.id" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 text-gray-400">{{ i+1 }}</td>
                  <td class="px-6 py-4 font-semibold text-gray-800">{{ h.item_name }}</td>
                  <td class="px-6 py-4">
                    <span :class="h.type==='masuk' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'" class="px-2.5 py-1 rounded-lg text-xs font-bold uppercase">{{ h.type }}</span>
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-700">{{ h.quantity }}</td>
                  <td class="px-6 py-4 text-gray-400">{{ h.note || '-' }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ h.user_name }}</td>
                  <td class="px-6 py-4 text-gray-400 text-xs">{{ h.created_at }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <h3 class="text-lg font-bold text-gray-800 mb-6">Catat Transaksi Stok</h3>
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-600 mb-2">Barang</label>
            <select v-model="form.item_id" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all">
              <option value="">Pilih Barang</option>
              <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-600 mb-2">Tipe Transaksi</label>
            <div class="flex gap-3">
              <button @click="form.type='masuk'" :class="form.type==='masuk' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600'" class="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all">↑ Stok Masuk</button>
              <button @click="form.type='keluar'" :class="form.type==='keluar' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600'" class="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all">↓ Stok Keluar</button>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-600 mb-2">Jumlah</label>
            <input v-model="form.quantity" type="number" min="1" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
          </div>
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-600 mb-2">Catatan</label>
            <input v-model="form.note" placeholder="Opsional..." class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
          </div>
          <div class="flex justify-end gap-3">
            <button @click="showModal=false" class="px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-100 text-gray-500 hover:bg-gray-50">Batal</button>
            <button @click="saveData" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() { return { history: [], items: [], showModal: false, form: { item_id: '', user_id: 1, type: 'masuk', quantity: 1, note: '' }, BASE_URL: 'http://localhost/backend-api/public/api' } },
  async mounted() {
    await this.loadData();
    const res = await axios.get(`${this.BASE_URL}/items`);
    this.items = res.data;
  },
  methods: {
    async loadData() { const res = await axios.get(`${this.BASE_URL}/stock-history`); this.history = res.data; },
    openModal() { const user = JSON.parse(localStorage.getItem('user') || '{}'); this.form = { item_id: '', user_id: user.id || 1, type: 'masuk', quantity: 1, note: '' }; this.showModal = true; },
    async saveData() { await axios.post(`${this.BASE_URL}/stock-history`, this.form); this.showModal = false; await this.loadData(); },
    logout() { localStorage.clear(); this.$router.push('/login'); }
  }
};