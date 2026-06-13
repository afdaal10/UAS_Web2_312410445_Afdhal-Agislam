const Items = {
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
            <li><router-link to="/items" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white shadow-sm" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">📦 Barang</router-link></li>
            <li><router-link to="/categories" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50">🗂 Kategori</router-link></li>
            <li><router-link to="/suppliers" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50">🏭 Supplier</router-link></li>
            <li><router-link to="/stock-history" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50">📋 Histori Stok</router-link></li>
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
            <h1 class="text-xl font-bold text-gray-800">Barang</h1>
            <p class="text-sm text-gray-400">Kelola data barang inventaris</p>
          </div>
          <button @click="openModal()" class="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">+ Tambah Barang</button>
        </header>
        <main class="flex-1 p-8">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100">
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">No</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama Barang</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">SKU</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Kategori</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Supplier</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Stok</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Harga</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in items" :key="item.id" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 text-gray-400">{{ i+1 }}</td>
                  <td class="px-6 py-4 font-semibold text-gray-800">{{ item.name }}</td>
                  <td class="px-6 py-4"><span class="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-xs font-mono">{{ item.sku }}</span></td>
                  <td class="px-6 py-4"><span class="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-semibold">{{ item.category_name }}</span></td>
                  <td class="px-6 py-4 text-gray-500">{{ item.supplier_name }}</td>
                  <td class="px-6 py-4">
                    <span :class="item.stock <= item.min_stock ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'" class="px-2.5 py-1 rounded-lg text-xs font-bold">{{ item.stock }}</span>
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-700">Rp {{ Number(item.price).toLocaleString('id-ID') }}</td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <button @click="openModal(item)" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100">Edit</button>
                      <button @click="deleteData(item.id)" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
          <h3 class="text-lg font-bold text-gray-800 mb-6">{{ form.id ? 'Edit' : 'Tambah' }} Barang</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-600 mb-2">Nama Barang</label>
              <input v-model="form.name" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-2">SKU</label>
              <input v-model="form.sku" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-2">Harga</label>
              <input v-model="form.price" type="number" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-2">Kategori</label>
              <select v-model="form.category_id" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all">
                <option value="">Pilih Kategori</option>
                <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-2">Supplier</label>
              <select v-model="form.supplier_id" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all">
                <option value="">Pilih Supplier</option>
                <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-2">Stok</label>
              <input v-model="form.stock" type="number" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-2">Min. Stok</label>
              <input v-model="form.min_stock" type="number" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button @click="showModal=false" class="px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-100 text-gray-500 hover:bg-gray-50">Batal</button>
            <button @click="saveData" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() { return { items: [], categories: [], suppliers: [], showModal: false, form: { id: null, name: '', sku: '', category_id: '', supplier_id: '', stock: 0, min_stock: 5, price: 0 }, BASE_URL: 'http://localhost/backend-api/public/api' } },
  async mounted() {
    await this.loadData();
    const [cats, sups] = await Promise.all([axios.get(`${this.BASE_URL}/categories`), axios.get(`${this.BASE_URL}/suppliers`)]);
    this.categories = cats.data; this.suppliers = sups.data;
  },
  methods: {
    async loadData() { const res = await axios.get(`${this.BASE_URL}/items`); this.items = res.data; },
    openModal(item = null) { this.form = item ? {...item} : { id: null, name: '', sku: '', category_id: '', supplier_id: '', stock: 0, min_stock: 5, price: 0 }; this.showModal = true; },
    async saveData() {
      if (this.form.id) await axios.put(`${this.BASE_URL}/items/${this.form.id}`, this.form);
      else await axios.post(`${this.BASE_URL}/items`, this.form);
      this.showModal = false; await this.loadData();
    },
    async deleteData(id) { if (confirm('Yakin hapus?')) { await axios.delete(`${this.BASE_URL}/items/${id}`); await this.loadData(); } },
    logout() { localStorage.clear(); this.$router.push('/login'); }
  }
};