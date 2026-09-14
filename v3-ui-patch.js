(function(){
  function target(){var f=document.getElementById('app');try{if(f&&f.contentDocument&&f.contentDocument.body)return f.contentDocument;}catch(e){}return document;}
  function cleanPhotoAdmin(){
    var d=target();
    var head=d.querySelector('.v3-page-head');
    if(head){var back=d.getElementById('v3BackAdmin');if(back)back.remove();}
    var form=d.getElementById('v3AlbumFormHost'),list=d.getElementById('v3AlbumAdminList');
    if(form&&list){var editing=!!form.querySelector('.v3-album-form');list.style.display=editing?'none':'';var add=Array.from(d.querySelectorAll('button')).find(function(b){return b.textContent.trim()==='+ Add Album';});if(add)add.style.display=editing?'none':'';}
  }
  function polishMobileNav(d){
    if(!d)return;
    var nav=d.querySelector('.nav'),signed=d.querySelector('.signedin'),header=d.querySelector('header');if(!nav||!signed||!header)return;
    var sign=signed.querySelector('.signout')||nav.querySelector('.signout');
    if(sign)sign.textContent='Sign out';
    if(window.innerWidth<=700&&!header.querySelector('.v3-mobile-user-photo')){
      var photo=signed.querySelector('.nav-user-photo,.nav-user-initials')||nav.querySelector('.nav-user-photo,.nav-user-initials');
      if(photo){var holder=d.createElement('div');holder.className='v3-mobile-user-photo';holder.appendChild(photo.cloneNode(true));header.appendChild(holder);}
    }
    nav.querySelectorAll('.nav-user-photo,.nav-user-initials').forEach(function(x){x.remove();});
    if(sign&&!nav.contains(sign))nav.appendChild(sign);
    signed.style.display='none';
    if(!d.getElementById('v3MobileNavStyle')){var s=d.createElement('style');s.id='v3MobileNavStyle';s.textContent='@media(max-width:700px){header{position:relative}.v3-mobile-user-photo{position:absolute;right:16px;top:12px;display:flex}.v3-mobile-user-photo .nav-user-photo,.v3-mobile-user-photo .nav-user-initials{width:34px;height:34px}.nav{display:flex!important;flex-wrap:nowrap!important;gap:0!important;width:100%!important;align-items:center}.nav button{flex:1 1 0!important;min-width:0!important;padding:8px 1px!important;font-size:11px!important;white-space:nowrap!important}.nav .signout{color:#9b2525!important;flex:1 1 0!important;width:auto!important;font-size:11px!important;padding:8px 1px!important}.top{gap:8px!important}}';d.head.appendChild(s);}
  }
  function polishPhotoInput(d){
    var input=d.querySelector('input[type="file"]');if(!input||input.dataset.v3FileUi)return;input.dataset.v3FileUi='1';
    input.style.position='absolute';input.style.width='1px';input.style.height='1px';input.style.opacity='0';input.style.overflow='hidden';input.style.clip='rect(0 0 0 0)';input.style.clipPath='inset(50%)';input.style.whiteSpace='nowrap';
    var wrap=input.parentElement;if(!wrap)return;var label=wrap.querySelector('label[for="'+input.id+'"]');
    if(!label){label=d.createElement('label');label.htmlFor=input.id;label.className='v3-file-button';label.textContent='Choose photo';input.insertAdjacentElement('beforebegin',label);}
    var status=wrap.querySelector('.v3-file-status');if(!status){status=d.createElement('span');status.className='v3-file-status';status.textContent=input.files&&input.files.length?input.files[0].name:'No new photo selected';label.insertAdjacentElement('afterend',status);}
    input.addEventListener('change',function(){status.textContent=input.files&&input.files.length?input.files[0].name:'No new photo selected';});
    if(!d.getElementById('v3FileStyle')){var st=d.createElement('style');st.id='v3FileStyle';st.textContent='.v3-file-button{display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;border:1px solid var(--line);border-radius:13px;background:#fff;color:var(--ink);font-weight:700;cursor:pointer;text-transform:none;letter-spacing:0;margin:0}.v3-file-status{display:block;margin-top:7px;color:var(--muted);font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}';d.head.appendChild(st);}
  }
  function polishAdminLayout(d){
    var h=Array.from(d.querySelectorAll('h2')).find(function(x){return x.textContent.trim()==='Admin';});if(!h)return;var card=h.closest('.card');if(!card)return;
    var head=card.firstElementChild;if(!head||head.dataset.v3AdminLayout)return;var p=head.querySelector('p'),actions=head.querySelector('.actions');if(!actions)return;
    head.dataset.v3AdminLayout='1';head.classList.add('v3-admin-head');if(p)p.classList.add('v3-admin-description');actions.classList.add('v3-admin-head-actions');
    if(!d.getElementById('v3AdminLayoutStyle')){var st=d.createElement('style');st.id='v3AdminLayoutStyle';st.textContent='.v3-admin-head{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:10px!important}.v3-admin-description{white-space:normal!important;margin:0!important;overflow:visible!important;text-overflow:clip!important;line-height:1.35!important}.v3-admin-head-actions{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;gap:8px!important;margin-top:0!important}.v3-admin-head-actions .btn{flex:1 1 0!important;white-space:nowrap!important}.v3-admin-head-actions .btn{padding:10px 13px!important}@media(max-width:700px){.v3-admin-description{font-size:14px!important;max-width:100%!important}.v3-admin-head-actions{gap:5px!important}.v3-admin-head-actions .btn{padding:9px 4px!important;font-size:10px!important}}';d.head.appendChild(st);}
  }
  function polishFilters(d){
    var all=d.getElementById('filterAll'),done=d.getElementById('filterComplete'),pending=d.getElementById('filterPending'),admins=d.getElementById('filterAdmins');
    if(done)done.textContent='✓ Done '+((window.adminMembers||[]).filter(function(m){return m.profile_completed;}).length);
    if(pending)pending.textContent='○ Not Done '+((window.adminMembers||[]).filter(function(m){return !m.profile_completed;}).length);
    if(admins)admins.textContent='Admin '+((window.adminMembers||[]).filter(function(m){return (window.adminRoles||{})[m.id]==='admin';}).length);
    if(all)all.textContent='All '+((window.adminMembers||[]).length);
    var wrap=all&&all.parentElement;if(wrap&&!d.getElementById('v3FilterStyle')){var st=d.createElement('style');st.id='v3FilterStyle';st.textContent='.admin-filters{display:flex!important;flex-wrap:wrap!important;gap:6px!important;align-items:center!important}.admin-filters .admin-filter{white-space:nowrap!important;padding:9px 12px!important}@media(max-width:700px){.admin-filters{gap:5px!important}.admin-filters .admin-filter{font-size:11px!important;padding:8px 9px!important}.admin-filters .admin-filter:nth-child(4){margin-right:0}}';d.head.appendChild(st);}
  }
  function polishSharePrint(d){
    if(!d)return;var a=d.querySelector('.v3-actions');if(!a)return;
    if(!d.getElementById('v3SharePrintStyle')){var st=d.createElement('style');st.id='v3SharePrintStyle';st.textContent='.v3-actions{display:contents!important}.v3-actions .btn{flex:0 0 auto!important;width:auto!important;padding:8px 12px!important;font-size:12px!important;white-space:nowrap!important}@media(max-width:700px){.v3-actions .btn{padding:7px 10px!important;font-size:11px!important}}';d.head.appendChild(st);}
  }
  function installPrintExit(d){
    var b=d&&d.getElementById('v3Print');if(!b||b.dataset.v3PrintExitFixed)return;
    var n=b.cloneNode(true);n.dataset.v3PrintExitFixed='1';b.parentNode.replaceChild(n,b);b=n;
    b.onclick=function(){
      var win=d.defaultView,a=Array.isArray(win.adminMembers)?win.adminMembers.slice():[],q=(d.getElementById('adminQ')&&d.getElementById('adminQ').value||'').toLowerCase();
      a=a.filter(function(m){return [m.full_name,m.preferred_name,m.mobile,m.whatsapp_phone,m.email,m.current_city,m.current_state,m.current_country,m.profession,m.company].some(function(v){return String(v||'').toLowerCase().includes(q);});});
      var f=win.adminFilter||'all';if(f==='complete')a=a.filter(function(m){return m.profile_completed;});if(f==='pending')a=a.filter(function(m){return !m.profile_completed;});if(f==='admins')a=a.filter(function(m){return (win.adminRoles||{})[m.id]==='admin';});
      function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
      var rows=a.map(function(m,i){return '<tr><td>'+(i+1)+'</td><td>'+esc(m.full_name||m.preferred_name||'')+'</td><td>'+esc(m.detailed_address||'')+'</td><td>'+esc(m.current_city||'')+'</td><td>'+esc(m.mobile||m.whatsapp_phone||'')+'</td><td>'+esc(m.email||'')+'</td></tr>';}).join('');
      var old=d.getElementById('v3PrintView');if(old)old.remove();
      var view=d.createElement('section');view.id='v3PrintView';view.innerHTML='<div class="v3-print-toolbar"><button type="button" id="v3PrintExit">← Exit</button><button type="button" class="print-main" id="v3PrintNow">Print</button></div><h1>COEP ENTC 1983 — Class Reunion</h1><p>Class list</p><table><thead><tr><th>S.N.</th><th>Name</th><th>Address</th><th>Town / City</th><th>Phone No.</th><th>Email</th></tr></thead><tbody>'+rows+'</tbody></table>';
      var s=d.createElement('style');s.id='v3PrintViewStyle';s.textContent='#v3PrintView{position:relative;background:#fffdf8;border:1px solid var(--line);border-radius:18px;padding:18px;margin:0}#v3PrintView .v3-print-toolbar{display:flex;gap:10px;margin:0 0 16px;padding:0 0 12px;border-bottom:1px solid #ddd;align-items:center}#v3PrintView button{padding:9px 15px;border:1px solid #cdbb9e;border-radius:10px;background:#fff;font-weight:700;cursor:pointer;color:#3e2919}#v3PrintView button.print-main{background:#c98616;color:#fff;border-color:#c98616}#v3PrintView h1{font:700 22px Georgia;margin:0 0 5px}#v3PrintView p{margin:0 0 14px;color:#666;font-size:12px}#v3PrintView table{width:100%;border-collapse:collapse;font-size:11px}#v3PrintView th,#v3PrintView td{border:1px solid #aaa;padding:6px 7px;text-align:left;vertical-align:top}#v3PrintView th{font-weight:700}@media print{@page{size:landscape;margin:12mm}body>*:not(#app){display:none!important}#v3PrintView{border:0!important;border-radius:0!important;padding:0!important;margin:0!important}#v3PrintView .v3-print-toolbar{display:none!important}}';d.head.appendChild(s);d.body.appendChild(view);
      d.getElementById('v3PrintExit').onclick=function(){view.remove();var st=d.getElementById('v3PrintViewStyle');if(st)st.remove();};
      d.getElementById('v3PrintNow').onclick=function(){win.focus();win.print();};
      view.scrollIntoView({block:'start'});
    };
  }
  function install(){var d=target();cleanPhotoAdmin();polishMobileNav(d);polishPhotoInput(d);polishAdminLayout(d);polishFilters(d);polishSharePrint(d);installPrintExit(d);var f=document.getElementById('app');try{if(f&&f.contentDocument&&!f.contentDocument.__v3UiObserver){var obs=new MutationObserver(function(){cleanPhotoAdmin();polishMobileNav(f.contentDocument);polishPhotoInput(f.contentDocument);polishAdminLayout(f.contentDocument);polishFilters(f.contentDocument);polishSharePrint(f.contentDocument);installPrintExit(f.contentDocument);});obs.observe(f.contentDocument.body,{childList:true,subtree:true});f.contentDocument.__v3UiObserver=true;}}catch(e){}}
  install();setTimeout(install,100);setTimeout(install,300);setTimeout(install,750);setInterval(install,1000);
})();
