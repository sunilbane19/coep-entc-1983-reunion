(function(){
  function target(){
    var f=document.getElementById('app');
    try{if(f&&f.contentDocument&&f.contentDocument.body)return f.contentDocument;}catch(e){}
    return document;
  }
  function cleanPhotoAdmin(){
    var d=target();
    var head=d.querySelector('.v3-page-head');
    if(head){var back=d.getElementById('v3BackAdmin');if(back)back.remove();}
    var form=d.getElementById('v3AlbumFormHost');
    var list=d.getElementById('v3AlbumAdminList');
    if(form&&list)list.style.display=form.querySelector('.v3-album-form')?'none':'';
  }
  function install(){
    cleanPhotoAdmin();
    var f=document.getElementById('app');
    try{
      var d=f&&f.contentDocument;
      if(d&&!d.__v3PhotoUiObserver){
        var obs=new MutationObserver(function(){cleanPhotoAdmin();});
        obs.observe(d.body,{childList:true,subtree:true});
        d.__v3PhotoUiObserver=true;
      }
    }catch(e){}
  }
  install();setTimeout(install,250);setTimeout(install,750);setInterval(install,1500);
})();
