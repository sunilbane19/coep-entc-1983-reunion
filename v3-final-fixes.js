(function(){
  /* Final V3 UI/auth fixes layered on top of the existing V3 enhancements. */
  function addAdminPhotosButton(){
    var buttons=Array.from(document.querySelectorAll('button'));
    var updates=buttons.find(function(b){return b.textContent.trim()==='Class Updates';});
    if(!updates||document.getElementById('v3AdminPhotos'))return;
    var b=document.createElement('button');
    b.id='v3AdminPhotos';
    b.type='button';
    b.className=updates.className||'btn secondary';
    b.textContent='Photos';
    b.addEventListener('click',function(){if(typeof go==='function')go('photos');});
    updates.parentNode.insertBefore(b,updates.nextSibling);
  }

  function setNextAlbumOrder(){
    var title=document.getElementById('v3AlbumTitle');
    var order=document.getElementById('v3AlbumOrder');
    if(!title||!order||order.value!=='0')return;
    sb.from('reunion_photo_albums').select('sort_order').order('sort_order',{ascending:false}).limit(1).then(function(r){
      var max=r.data&&r.data.length?Number(r.data[0].sort_order||0):0;
      order.value=String(max+1);
    });
  }

  function wrapAlbumForm(){
    if(typeof window.v3ShowAlbumForm!=='function'||window.v3ShowAlbumForm.__v3Wrapped)return;
    var original=window.v3ShowAlbumForm;
    function wrapped(a){original(a);if(!a)setTimeout(setNextAlbumOrder,0);}
    wrapped.__v3Wrapped=true;
    window.v3ShowAlbumForm=wrapped;
  }

  function syncAfterExternalAuth(){
    try{
      if(typeof sb==='undefined')return;
      sb.auth.getSession().then(function(r){
        if(!r.data||!r.data.session)return;
        if(typeof user!=='undefined')user=r.data.session.user;
        if(typeof load==='function'){
          Promise.resolve(load()).then(function(){
            if(location.hash!=='#admin')location.hash='#admin';
            if(typeof render==='function')render();
          });
        }
      });
    }catch(e){}
  }

  function install(){
    addAdminPhotosButton();
    wrapAlbumForm();
  }

  /* The email-link callback writes this signal when authentication completes.
     The original V3 tab reacts here, so the user does not need to keep navigating tabs. */
  window.addEventListener('storage',function(e){
    if(e.key==='v3_auth_complete')syncAfterExternalAuth();
  });

  /* Supabase normally propagates the session itself; this also covers browsers where
     the storage event is not observed by the embedded document. */
  try{
    if(typeof sb!=='undefined')sb.auth.onAuthStateChange(function(event,session){
      if(session&&(event==='SIGNED_IN'||event==='INITIAL_SESSION'||event==='TOKEN_REFRESHED'))syncAfterExternalAuth();
    });
  }catch(e){}

  install();
  setTimeout(install,250);
  setTimeout(install,750);
  setInterval(install,1000);
})();
