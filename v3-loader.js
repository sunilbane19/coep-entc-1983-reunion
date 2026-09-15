(function(){
  var started=false;
  function add(d,id,src,next){
    if(d.getElementById(id)){next();return;}
    var s=d.createElement('script');s.id=id;s.src=src;s.async=false;s.onload=next;s.onerror=function(){setTimeout(next,250);};(d.body||d.documentElement).appendChild(s);
  }
  function revealAdmin(d){
    try{if((location.hash||'').toLowerCase()==='#admin')d.documentElement.style.visibility='visible';}catch(e){}
  }
  function installStableAlbumPosition(d){
    if(!d||d.getElementById('v3StableAlbumPosition'))return;
    var s=d.createElement('style');s.id='v3StableAlbumPosition';
    s.textContent='#v3AlbumFormHost{margin:0!important;padding:0!important;min-height:0!important;height:0!important;overflow:visible!important;}#v3AlbumFormHost + button.btn{margin-top:18px!important;margin-bottom:8px!important;transform:none!important;}';
    (d.head||d.documentElement).appendChild(s);
  }
  function inject(){
    var f=document.getElementById('app');
    if(!f||started)return !!started;
    try{
      var d=f.contentDocument;
      if(!d||!d.body)return false;
      started=true;
      var adminLoad=(location.hash||'').toLowerCase()==='#admin';
      if(adminLoad){d.documentElement.style.visibility='hidden';setTimeout(function(){revealAdmin(d);},5000);}
      add(d,'v3EnhancementsLoader','/v3-enhancements.js?v=20260915-8',function(){
        add(d,'v3FixesLoader','/v3-fixes.js?v=20260915-8',function(){
          add(d,'v3FinalFixesLoader','/v3-final-fixes.js?v=20260915-5',function(){
            add(d,'v3LoginPatchLoader','/v3-login-patch.js?v=20260915-4',function(){
              add(d,'v3UiPatchLoader','/v3-ui-patch.js?v=20260915-8',function(){
                installStableAlbumPosition(d);
                revealAdmin(d);
              });
            });
          });
        });
      });
      return true;
    }catch(e){started=false;return false;}
  }
  function start(){
    var f=document.getElementById('app');if(!f)return;
    f.addEventListener('load',function(){started=false;var n=0,t=setInterval(function(){if(inject()||++n>120)clearInterval(t);},250);});
    var n=0,t=setInterval(function(){if(inject()||++n>120)clearInterval(t);},250);
  }
  start();
})();
