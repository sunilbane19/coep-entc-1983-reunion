(function(){
  var started=false;
  function add(d,id,src,next){
    if(d.getElementById(id)){next();return;}
    var s=d.createElement('script');s.id=id;s.src=src;s.async=false;s.onload=next;s.onerror=function(){setTimeout(next,250);};(d.body||d.documentElement).appendChild(s);
  }
  function moveAddAlbum(d){
    function apply(){
      var btn=Array.from(d.querySelectorAll('button')).find(function(b){return b.textContent.trim()==='+ Add Album';});
      if(btn){btn.style.transform='translateY(-20px)';btn.style.marginBottom='20px';}
    }
    apply();
    if(!d.__v3AlbumObserver && d.body){
      var mo=new MutationObserver(apply);
      mo.observe(d.body,{childList:true,subtree:true});
      d.__v3AlbumObserver=mo;
    }
  }
  function revealAdmin(d){
    try{if((location.hash||'').toLowerCase()==='#admin')d.documentElement.style.visibility='visible';}catch(e){}
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
      add(d,'v3EnhancementsLoader','/v3-enhancements.js?v=20260914-6',function(){
        add(d,'v3FixesLoader','/v3-fixes.js?v=20260914-6',function(){
          add(d,'v3FinalFixesLoader','/v3-final-fixes.js?v=20260914-3',function(){
            add(d,'v3LoginPatchLoader','/v3-login-patch.js?v=20260914-2',function(){
              add(d,'v3UiPatchLoader','/v3-ui-patch.js?v=20260914-6',function(){
                var st=d.createElement('style');
                st.id='v3AlbumSpacingFix';
                st.textContent='.v3-album-admin-list{margin-top:0!important}#v3AlbumFormHost{margin-top:0!important}';
                (d.head||d.body).appendChild(st);
                moveAddAlbum(d);
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
