import { Router } from 'express';
import { getSupabase } from '../services/supabase.js';

const router = Router();

function mapProjectRow(row) {
  if (!row) return row;
  return {
    ...row,
    Title: row.title,
    Img: row.img,
    Link: row.link,
    Github: row.github,
    Description: row.description,
    TechStack: row.techstack,
    Features: row.features,
    Username: row.username,
    Password: row.password,
  };
}

function mapProjectRows(data) {
  return Array.isArray(data) ? data.map(mapProjectRow) : mapProjectRow(data);
}

router.get('/', async (req, res) => {
  try {
    const { data, error } = await getSupabase()
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(mapProjectRows(data));
  } catch (err) {
    console.error('[Projects] Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const { count, error } = await getSupabase()
      .from('projects')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    res.json({ count: count || 0 });
  } catch (err) {
    console.error('[Projects] Count error:', err.message);
    res.status(500).json({ error: 'Failed to count projects' });
  }
});

router.post('/reorder', async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: 'orderedIds array required' });
    }

    const updates = orderedIds.map((id, index) =>
      getSupabase().from('projects').update({ sort_order: index }).eq('id', id)
    );
    await Promise.all(updates);

    res.json({ message: 'Reordered' });
  } catch (err) {
    console.error('[Projects] Reorder error:', err.message);
    res.status(500).json({ error: 'Failed to reorder projects' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await getSupabase()
      .from('projects')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Project not found' });
    res.json(mapProjectRow(data));
  } catch (err) {
    console.error('[Projects] Fetch one error:', err.message);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

const ALLOWED_FIELDS = new Set(['title', 'img', 'link', 'github', 'description', 'techstack', 'features', 'sort_order', 'username', 'password']);

function mapProjectFields(body) {
  const fieldMap = {
    Title: 'title',
    Img: 'img',
    Link: 'link',
    Github: 'github',
    Description: 'description',
    TechStack: 'techstack',
    Features: 'features',
    Username: 'username',
    Password: 'password',
  };
  const mapped = {};
  for (const [key, val] of Object.entries(body)) {
    const dbField = fieldMap[key] || key;
    if (ALLOWED_FIELDS.has(dbField)) {
      mapped[dbField] = val;
    }
  }
  return mapped;
}

router.post('/', async (req, res) => {
  try {
    const payload = mapProjectFields(req.body);

    const { count: existingCount } = await getSupabase()
      .from('projects')
      .select('*', { count: 'exact', head: true });
    payload.sort_order = existingCount || 0;

    const { data, error } = await getSupabase()
      .from('projects')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('[Projects] Create error:', err.message);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payload = mapProjectFields(req.body);
    const { data, error } = await getSupabase()
      .from('projects')
      .update(payload)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('[Projects] Update error:', err.message);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { error } = await getSupabase()
      .from('projects')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('[Projects] Delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
