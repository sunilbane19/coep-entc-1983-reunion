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

  /* Present album order as 1, 2, 3... rather than the original 10, 20 scheme.
     Existing sort_order values are still accepted, and saving an album normalises
     the edited value to its visible position. */
  function normaliseAlbumOrderField(){
    var id=document.getElementById('v3AlbumId');
    var order=document.getElementById('v3AlbumOrder');
    if(!order)return;
    sb.from('reunion_photo_albums').select('id,sort_order').order('sort_order',{ascending:true}).order('id',{ascending:true}).then(function(r){
      if(r.error||!r.data)return;
      var list=r.data;
      if(id&&id.value){
        var idx=list.findIndex(function(x){return Number(x.id)===Number(id.value);});
        if(idx>=0)order.value=String(idx+1);
      }else{
        order.value=String(list.length+1);
      }
    });
  }

  function wrapAlbumForm(){
    if(typeof window.v3ShowAlbumForm!=='function'||window.v3ShowAlbumForm.__v3Wrapped)return;
    var original=window.v3ShowAlbumForm;
    function wrapped(a){original(a);setTimeout(normaliseAlbumOrderField,0);}
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

  /* The email-link callback writes this signal when authentication completes. */
  window.addEventListener('storage',function(e){
    if(e.key==='v3_auth_complete')syncAfterExternalAuth();
  });

  /* Supabase normally propagates the session itself; this also covers browsers where
     the storage event is not observed by the embedded document. */
  try{
    if(typeof sb!=='undefined')sb.auth.onAuthStateChange(function(event,session){
      if(session&&(event==='SIGNED_IN'||event==='INITIAL_SESSION'))syncAfterExternalAuth();
    });
  }catch(e){}

  install();
  setTimeout(install,250);
  setTimeout(install,750);
  setInterval(install,1000);
})();
