import { Router } from 'express';
import { getSupabase } from '../services/supabase.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await getSupabase()
      .from('certificates')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('[Certificates] Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const { count, error } = await getSupabase()
      .from('certificates')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    res.json({ count: count || 0 });
  } catch (err) {
    console.error('[Certificates] Count error:', err.message);
    res.status(500).json({ error: 'Failed to count certificates' });
  }
});

router.post('/reorder', async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: 'orderedIds array required' });
    }

    const updates = orderedIds.map((id, index) =>
      getSupabase().from('certificates').update({ sort_order: index }).eq('id', id)
    );
    await Promise.all(updates);

    res.json({ message: 'Reordered' });
  } catch (err) {
    console.error('[Certificates] Reorder error:', err.message);
    res.status(500).json({ error: 'Failed to reorder certificates' });
  }
});

router.post('/', async (req, res) => {
  try {
    const img = req.body.Img || req.body.img || '';
    if (typeof img !== 'string' || !img.trim()) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const payload = { img: img.trim() };

    const { count: existingCount } = await getSupabase()
      .from('certificates')
      .select('*', { count: 'exact', head: true });
    payload.sort_order = existingCount || 0;

    const { data, error } = await getSupabase()
      .from('certificates')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('[Certificates] Create error:', err.message);
    res.status(500).json({ error: 'Failed to create certificate' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { error } = await getSupabase()
      .from('certificates')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('[Certificates] Delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

export default router;
