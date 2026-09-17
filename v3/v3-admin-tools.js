(function(){
  'use strict';
  var STYLE_ID='v3AdminToolsStyle',BUTTONS_ID='v3AdminToolsButtons',ALBUM_BUTTON_ID='v3AdminAlbumsButton';
  var SUPABASE_URL='https://tizxolwmqrwvdheeqxrv.supabase.co';
  var SUPABASE_KEY='sb_publishable_lYUj7I1I7Rij5o0ptqPWrA_Qs37Aqta';
  var sb=null,photoRendering=false;

  function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});}
  function client(){if(!sb&&window.supabase)sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'} });return sb;}

  function style(){
    if(document.getElementById(STYLE_ID))return;
    var s=document.createElement('style');s.id=STYLE_ID;
    s.textContent='.v3-admin-tools{display:flex;gap:7px;align-items:center;margin-top:12px;flex-wrap:wrap}.v3-admin-tools .btn{padding:8px 12px;font-size:12px;white-space:nowrap}.v3-photo-album-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:18px}.v3-photo-album-card{background:linear-gradient(135deg,#fffdf8,#fff4dc);border:1px solid var(--line);border-radius:20px;padding:24px;display:flex;flex-direction:column;min-height:260px}.v3-photo-album-card h3{font-size:27px;margin:0 0 8px}.v3-photo-album-card p{color:var(--muted);line-height:1.5;margin:0}.v3-photo-album-card .album-order{font-size:12px;color:var(--muted);margin-bottom:10px}.v3-photo-album-card .actions{margin-top:auto;padding-top:18px}.v3-photo-album-card .btn{text-decoration:none;display:inline-flex;align-items:center;justify-content:center}@media(max-width:700px){.v3-photo-album-grid{grid-template-columns:1fr}.v3-photo-album-card{padding:20px}.v3-photo-album-card h3{font-size:24px}.v3-photo-album-card .btn{width:100%}}';
    document.head.appendChild(s);
  }

  function rows(){
    var r=(window.adminMembers||[]).slice(),q=(document.getElementById('adminQ')?.value||'').toLowerCase().trim(),f=window.adminFilter||'all';
    if(q)r=r.filter(function(m){return [m.full_name,m.preferred_name,m.mobile,m.whatsapp_phone,m.email,m.current_city,m.current_state,m.current_country,m.profession,m.company].some(function(v){return String(v||'').toLowerCase().includes(q);});});
    if(f==='complete')r=r.filter(function(m){return !!m.profile_completed;});
    if(f==='pending')r=r.filter(function(m){return !m.profile_completed;});
    if(f==='admins')r=r.filter(function(m){return (window.adminRoles||{})[m.id]==='admin';});
    return r;
  }
  function labels(){var ms=window.adminMembers||[],c=document.getElementById('filterComplete'),p=document.getElementById('filterPending');if(c)c.textContent='✓ Complete '+ms.filter(function(m){return !!m.profile_completed;}).length;if(p)p.textContent='○ Not completed '+ms.filter(function(m){return !m.profile_completed;}).length;}
  function excel(done){if(window.ExcelJS)return done();var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js';s.onload=done;s.onerror=function(){alert('Excel export could not load. Please check your internet connection.')};document.head.appendChild(s);}
  function exportExcel(){var r=rows();excel(async function(){var w=new ExcelJS.Workbook(),s=w.addWorksheet('Class List');s.mergeCells('A1:F1');s.getCell('A1').value='COEP ENTC 1983 — Class Reunion';s.mergeCells('A2:F2');s.getCell('A2').value='Filter: '+(window.adminFilter||'all')+' • '+r.length+' records • '+new Date().toLocaleDateString('en-IN');s.addRow(['S.N.','Name','Address','Town / City','Phone No.','Email']);r.forEach(function(m,i){s.addRow([i+1,m.full_name||m.preferred_name||'',m.detailed_address||'', [m.current_city,m.current_state,m.current_country].filter(Boolean).join(', '),m.mobile||m.whatsapp_phone||'',m.email||'']);});[8,28,42,28,20,34].forEach(function(x,i){s.getColumn(i+1).width=x;});var b=await w.xlsx.writeBuffer(),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([b],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));a.download='COEP_ENTC_1983_'+(window.adminFilter||'all')+'_'+new Date().toISOString().slice(0,10)+'.xlsx';a.click();});}
  function printList(){var r=rows(),w=window.open('','_blank','width=1100,height=800');if(!w){alert('Please allow pop-ups for the reunion site to print.');return;}w.document.write('<!doctype html><html><head><title>COEP ENTC 1983 — Class Reunion</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:Arial;font-size:11px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #bbb;padding:6px;text-align:left}th{background:#f3ead9}</style></head><body><button onclick="window.print()">Print</button> <button onclick="window.close()">Exit</button><h1>COEP ENTC 1983 — Class Reunion</h1><table><thead><tr><th>S.N.</th><th>Name</th><th>Address</th><th>Town / City</th><th>Phone No.</th><th>Email</th></tr></thead><tbody>'+r.map(function(m,i){return '<tr><td>'+(i+1)+'</td><td>'+esc(m.full_name||m.preferred_name||'')+'</td><td>'+esc(m.detailed_address||'')+'</td><td>'+esc([m.current_city,m.current_state,m.current_country].filter(Boolean).join(', '))+'</td><td>'+esc(m.mobile||m.whatsapp_phone||'')+'</td><td>'+esc(m.email||'')+'</td></tr>';}).join('')+'</tbody></table></body></html>');w.document.close();}

  function addAdminTools(){
    if(!window.isAdmin||!window.adminMembers)return;
    style();labels();
    var f=document.querySelector('.admin-filters');
    if(f&&!document.getElementById(BUTTONS_ID)){var w=document.createElement('div');w.id=BUTTONS_ID;w.className='v3-admin-tools';var e=document.createElement('button');e.className='btn';e.type='button';e.textContent='Export';e.onclick=exportExcel;var p=document.createElement('button');p.className='btn secondary';p.type='button';p.textContent='Print';p.onclick=printList;w.append(e,p);f.insertAdjacentElement('afterend',w);}
    var bs=Array.from(document.querySelectorAll('#app .actions button')),u=bs.find(function(b){return b.textContent.trim()==='Class Updates';}),a=bs.find(function(b){return b.textContent.trim()==='+ Add New Member'||b.textContent.trim()==='+ Add Member';});
    if((u||a)&&!document.getElementById(ALBUM_BUTTON_ID)){var b=document.createElement('button');b.id=ALBUM_BUTTON_ID;b.className='btn secondary';b.type='button';b.textContent='Photo Albums';b.onclick=function(){location.href='/v3/admin-albums.html';};(a||u).parentNode.insertBefore(b,a||null);}
  }

  async function photosPageV3(){
    if(photoRendering)return;
    photoRendering=true;
    try{
      var app=document.getElementById('app');if(!app)return;style();
      app.innerHTML='<section class="card"><div><h2>Photos</h2><div class="stat">Our reunion photographs are shared in our common Google Photos albums.</div></div><div id="v3PhotoAlbums" class="v3-photo-album-grid"><div class="stat">Loading albums…</div></div></section>';
      var c=client();if(!c)return;
      var r=await c.from('reunion_photo_albums').select('id,title,description,url,sort_order,is_active').eq('is_active',true).order('sort_order',{ascending:true}).order('id',{ascending:true});
      if(r.error){app.innerHTML='<section class="card"><h2>Photos</h2><div class="notice error">'+esc(r.error.message)+'</div></section>';return;}
      var host=document.getElementById('v3PhotoAlbums');if(!host)return;
      host.innerHTML=(r.data||[]).map(function(a){return '<article class="v3-photo-album-card"><div class="album-order">Album '+esc(a.sort_order)+'</div><h3>'+esc(a.title||'Photo Album')+'</h3><p>'+esc(a.description||'')+'</p><div class="actions"><a class="btn" href="'+esc(a.url||'#')+'" target="_blank" rel="noopener noreferrer">Open Photo Album →</a></div></article>';}).join('')||'<p class="stat">No photo albums have been added yet.</p>';
    }finally{photoRendering=false;var a=document.getElementById('app');if(a&&location.hash==='#photos')a.style.visibility='visible';}
  }

  function reconcile(){
    if(location.hash==='#photos'){
      var app=document.getElementById('app');
      if(app&&document.querySelector('.photos-landing')&&!document.getElementById('v3PhotoAlbums')){
        app.style.visibility='hidden';
        photosPageV3();
      }
    }else if(location.hash==='#admin'){
      if(document.querySelector('.admin-filters')&&window.adminMembers)addAdminTools();
    }
  }

  function watchLifecycle(){
    var app=document.getElementById('app');if(!app)return;
    var observer=new MutationObserver(function(){reconcile();});
    observer.observe(app,{childList:true,subtree:true});
    reconcile();
  }

  window.photosPage=photosPageV3;
  window.addEventListener('hashchange',function(){
    if(location.hash==='#photos'){
      var app=document.getElementById('app');if(app)app.style.visibility='hidden';
    }
    setTimeout(reconcile,0);
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watchLifecycle);else watchLifecycle();
})();