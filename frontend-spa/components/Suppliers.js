const Suppliers = {
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
            <li><router-link to="/suppliers" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white shadow-sm" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">🏭 Supplier</router-link></li>
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
            <h1 class="text-xl font-bold text-gray-800">Supplier</h1>
            <p class="text-sm text-gray-400">Kelola data pemasok barang</p>
          </div>
          <button @click="openModal()" class="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">+ Tambah Supplier</button>
        </header>
        <main class="flex-1 p-8">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100">
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">No</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Kontak</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Telepon</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Alamat</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(sup, i) in suppliers" :key="sup.id" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 text-gray-400">{{ i+1 }}</td>
                  <td class="px-6 py-4 font-semibold text-gray-800">{{ sup.name }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ sup.contact || '-' }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ sup.phone || '-' }}</td>
                  <td class="px-6 py-4 text-gray-400 max-w-xs truncate">{{ sup.address || '-' }}</td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <button @click="openModal(sup)" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100">Edit</button>
                      <button @click="deleteData(sup.id)" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100">Hapus</button>
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
        <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <h3 class="text-lg font-bold text-gray-800 mb-6">{{ form.id ? 'Edit' : 'Tambah' }} Supplier</h3>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-600 mb-2">Nama Supplier</label>
              <input v-model="form.name" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-2">Nama Kontak</label>
              <input v-model="form.contact" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-2">Telepon</label>
              <input v-model="form.phone" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-600 mb-2">Alamat</label>
              <textarea v-model="form.address" rows="2" class="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none"></textarea>
            </div>
          </div>
          <div class="flex justify-end gap-3">
            <button @click="showModal=false" class="px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-100 text-gray-500 hover:bg-gray-50">Batal</button>
            <button @click="saveData" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90" style="background: linear-gradient(135deg, #1e3a5f, #2d6a9f)">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() { return { suppliers: [], showModal: false, form: { id: null, name: '', contact: '', phone: '', address: '' }, BASE_URL: 'http://localhost/backend-api/public/api' } },
  async mounted() { await this.loadData(); },
  methods: {
    async loadData() { const res = await axios.get(`${this.BASE_URL}/suppliers`); this.suppliers = res.data; },
    openModal(sup = null) { this.form = sup ? {...sup} : { id: null, name: '', contact: '', phone: '', address: '' }; this.showModal = true; },
    async saveData() {
      if (this.form.id) await axios.put(`${this.BASE_URL}/suppliers/${this.form.id}`, this.form);
      else await axios.post(`${this.BASE_URL}/suppliers`, this.form);
      this.showModal = false; await this.loadData();
    },
    async deleteData(id) { if (confirm('Yakin hapus?')) { await axios.delete(`${this.BASE_URL}/suppliers/${id}`); await this.loadData(); } },
    logout() { localStorage.clear(); this.$router.push('/login'); }
  }
};