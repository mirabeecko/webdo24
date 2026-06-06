/* ── FAQ FROM SUPABASE ── */
(function loadFaq() {
  const SUPABASE_URL = 'https://mljqltwcdqknezueqisb.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sanFsdHdjZHFrbmV6dXFwaXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTMzNTgsImV4cCI6MjA2MDg4OTM1OH0.rG9nXbN7uY8GaVVB3xh6sKwIIe4-HoVAFY_HOzaLZSs';

  const list = document.getElementById('faq-list');
  if (!list) return;
  if (SUPABASE_URL.includes('YOUR_')) {
    console.log('FAQ: Supabase credentials not set yet, using static fallback.');
    return;
  }

  const category = list.dataset.category || 'index';

  fetch(`${SUPABASE_URL}/rest/v1/faq?select=*&category=eq.${encodeURIComponent(category)}&is_active=eq.true&order=sort_order.asc`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  .then(r => {
    if (!r.ok) throw new Error('FAQ load failed: ' + r.status);
    return r.json();
  })
  .then(items => {
    if (!items || !items.length) return;
    list.innerHTML = items.map(item => `
      <div class="faq-item">
        <button class="faq-btn" onclick="toggleFaq(this)">
          <span>${escapeHtml(item.question)}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">${item.answer}</div>
      </div>
    `).join('');
  })
  .catch(err => {
    console.log('FAQ loaded from static fallback', err.message);
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
