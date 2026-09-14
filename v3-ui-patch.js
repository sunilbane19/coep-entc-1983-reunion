(function(){
  function cleanPhotoAdmin(){
    var app=document.getElementById('app');
    if(!app)return;
    var head=app.querySelector('.v3-page-head');
    if(head){
      var back=document.getElementById('v3BackAdmin');
      if(back)back.remove();
    }
    var form=document.getElementById('v3AlbumFormHost');
    var list=document.getElementById('v3AlbumAdminList');
    if(form&&list){
      var editing=!!form.querySelector('.v3-album-form');
      list.style.display=editing?'none':'';
    }
  }
  function install(){
    cleanPhotoAdmin();
    var app=document.getElementById('app');
    if(app&&!app.__v3PhotoUiObserver){
      var obs=new MutationObserver(function(){cleanPhotoAdmin();});
      obs.observe(app,{childList:true,subtree:true});
      app.__v3PhotoUiObserver=true;
    }
  }
  install();
  setTimeout(install,250);
  setTimeout(install,750);
  setInterval(install,1500);
})();
