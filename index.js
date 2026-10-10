const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Selamat datang di API Perpustakaan! Gunakan endpoint /loans untuk mengakses data.');
});

// 1. CREATE: Tambah peminjaman buku
app.post('/loans', async (req, res) => {
    const { member_name, book_title, return_date, status } = req.body;
    const { data, error } = await supabase
        .from('loans')
        .insert([{ member_name, book_title, return_date, status }])
        .select();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Data peminjaman berhasil ditambahkan', data });
});

// 2. READ: Ambil semua data (Dengan fitur filter query misal: ?status=Terlambat)
app.get('/loans', async (req, res) => {
    const { status } = req.query;
    let query = supabase.from('loans').select('*');
    
    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ data });
});

// READ: Ambil data spesifik berdasarkan ID
app.get('/loans/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('loans').select('*').eq('id', id).single();
    
    if (error) return res.status(404).json({ error: 'Data tidak ditemukan' });
    res.status(200).json({ data });
});

// 3. UPDATE: Perbarui data peminjaman (contoh: ubah status ke 'Dikembalikan')
app.put('/loans/:id', async (req, res) => {
    const { id } = req.params;
    const { return_date, status } = req.body;
    
    const { data, error } = await supabase
        .from('loans')
        .update({ return_date, status })
        .eq('id', id)
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'Data peminjaman berhasil diperbarui', data });
});

// 4. DELETE: Hapus data peminjaman
app.delete('/loans/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('loans').delete().eq('id', id);
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'Data peminjaman berhasil dihapus' });
});

// Export app untuk keperluan serverless Vercel
module.exports = app;

// Jalankan server lokal jika tidak di environment Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}