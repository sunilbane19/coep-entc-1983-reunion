(function(){
  function target(){var f=document.getElementById('app');try{if(f&&f.contentDocument&&f.contentDocument.body)return f.contentDocument;}catch(e){}return document;}
  function cleanPhotoAdmin(){
    var d=target();
    var head=d.querySelector('.v3-page-head');
    if(head){var back=d.getElementById('v3BackAdmin');if(back)back.remove();}
    var form=d.getElementById('v3AlbumFormHost');
    var list=d.getElementById('v3AlbumAdminList');
    if(form&&list){
      var editing=!!form.querySelector('.v3-album-form');
      list.style.display=editing?'none':'';
      var add=Array.from(d.querySelectorAll('button')).find(function(b){return b.textContent.trim()==='+ Add Album';});
      if(add)add.style.display=editing?'none':'';
    }
  }
  function polishMobileNav(d){
    if(!d||d.getElementById('v3MobileNavStyle'))return;
    var s=d.createElement('style');s.id='v3MobileNavStyle';s.textContent='@media(max-width:700px){.nav{display:flex;flex-wrap:nowrap;gap:2px;width:100%;align-items:center}.nav button{flex:1 1 auto;min-width:0;padding:9px 4px;font-size:12px;white-space:nowrap}.nav .signout{flex:0 0 34px;width:34px;padding:8px 2px;font-size:0}.nav .signout::before{content:"↪";font-size:21px;line-height:1;display:inline-block}.top{gap:8px}}';d.head.appendChild(s);
  }
  function polishPhotoInput(d){
    var input=d.querySelector('input[type="file"]');
    if(!input||input.dataset.v3FileUi)return;
    input.dataset.v3FileUi='1';
    input.style.position='absolute';input.style.width='1px';input.style.height='1px';input.style.opacity='0';input.style.overflow='hidden';input.style.clip='rect(0 0 0 0)';input.style.clipPath='inset(50%)';input.style.whiteSpace='nowrap';
    var wrap=input.parentElement;if(!wrap)return;
    var label=wrap.querySelector('label[for="'+input.id+'"]');
    if(!label){label=d.createElement('label');label.htmlFor=input.id;label.className='v3-file-button';label.textContent='Choose photo';input.insertAdjacentElement('beforebegin',label);}
    var status=wrap.querySelector('.v3-file-status');
    if(!status){status=d.createElement('span');status.className='v3-file-status';status.textContent=input.files&&input.files.length?input.files[0].name:'No new photo selected';label.insertAdjacentElement('afterend',status);}
    input.addEventListener('change',function(){status.textContent=input.files&&input.files.length?input.files[0].name:'No new photo selected';});
    if(!d.getElementById('v3FileStyle')){var st=d.createElement('style');st.id='v3FileStyle';st.textContent='.v3-file-button{display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;border:1px solid var(--line);border-radius:13px;background:#fff;color:var(--ink);font-weight:700;cursor:pointer;text-transform:none;letter-spacing:0;margin:0}.v3-file-status{display:block;margin-top:7px;color:var(--muted);font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}';d.head.appendChild(st);}
  }
  function polishAdminActions(d){
    var h=Array.from(d.querySelectorAll('h2')).find(function(x){return x.textContent.trim()==='Admin';});
    if(!h)return;
    var card=h.closest('.card');if(!card)return;
    if(card.querySelector('#v3AdminActionRow'))return;
    var names=['Class Updates','Photos','+ Add New Member'];
    var buttons=names.map(function(name){return Array.from(card.querySelectorAll('button')).find(function(b){return b.textContent.trim()===name;});}).filter(Boolean);
    if(buttons.length<3)return;
    var row=d.createElement('div');row.id='v3AdminActionRow';row.className='v3-admin-action-row';
    buttons.forEach(function(b){row.appendChild(b);});
    var head=h.closest('div[style*="display:flex"]');
    if(head&&head.parentNode===card){head.appendChild(row);}
    else{card.insertBefore(row,card.firstChild);}
    var st=d.createElement('style');st.textContent='.v3-admin-action-row{display:flex;gap:8px;align-items:center;justify-content:flex-end;flex-wrap:nowrap}.v3-admin-action-row .btn{white-space:nowrap}.v3-admin-action-row .btn{padding:10px 13px}@media(max-width:700px){.v3-admin-action-row{width:100%;gap:5px;justify-content:stretch}.v3-admin-action-row .btn{flex:1 1 0;min-width:0;padding:9px 5px;font-size:11px}}';d.head.appendChild(st);
  }
  function install(){
    var d=target();
    cleanPhotoAdmin();
    polishMobileNav(d);
    polishPhotoInput(d);
    polishAdminActions(d);
    var f=document.getElementById('app');
    try{if(f&&f.contentDocument&&!f.contentDocument.__v3PhotoUiObserver){var obs=new MutationObserver(function(){cleanPhotoAdmin();polishMobileNav(f.contentDocument);polishPhotoInput(f.contentDocument);polishAdminActions(f.contentDocument);});obs.observe(f.contentDocument.body,{childList:true,subtree:true});f.contentDocument.__v3PhotoUiObserver=true;}}catch(e){}
  }
  install();setTimeout(install,100);setTimeout(install,300);setTimeout(install,750);setInterval(install,1000);
})();
