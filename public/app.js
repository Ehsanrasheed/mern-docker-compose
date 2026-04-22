async function fetchItems(){
  const res = await fetch('/api/items');
  return res.json();
}

function render(items){
  const ul = document.getElementById('items');
  ul.innerHTML = '';
  items.forEach(item =>{
    const li = document.createElement('li');
    li.innerHTML = `<div><strong>${escapeHtml(item.title)}</strong><div class="small">${new Date(item.createdAt).toLocaleString()}</div></div><div><button data-id="${item._id}" class="del">Delete</button></div>`;
    ul.appendChild(li);
  });
}

function escapeHtml(s){ return (s||'').replace(/[&"'<>]/g, c=>({'&':'&amp;','"':'&quot;','\'':'&#39;','<':'&lt;','>':'&gt;'}[c])); }

async function reload(){ render(await fetchItems()); }

document.getElementById('itemForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  if(!title) return alert('Title required');
  await fetch('/api/items', {
    method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, content })
  });
  document.getElementById('title').value='';
  document.getElementById('content').value='';
  reload();
});

document.getElementById('items').addEventListener('click', async e=>{
  if(e.target.matches('.del')){
    const id = e.target.dataset.id;
    await fetch('/api/items/'+id, { method: 'DELETE' });
    reload();
  }
});

reload();
