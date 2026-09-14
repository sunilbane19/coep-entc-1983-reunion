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
  function install(){
    cleanPhotoAdmin();
    var f=document.getElementById('app');
    try{var d=f&&f.contentDocument;if(d&&!d.__v3PhotoUiObserver){var obs=new MutationObserver(function(){cleanPhotoAdmin();});obs.observe(d.body,{childList:true,subtree:true});d.__v3PhotoUiObserver=true;}}catch(e){}
  }
  install();setTimeout(install,100);setTimeout(install,300);setTimeout(install,750);setInterval(install,1500);
})();
