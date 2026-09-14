(function(){
  var started=false;
  function add(d,id,src,next){
    if(d.getElementById(id)){next();return;}
    var s=d.createElement('script');s.id=id;s.src=src;s.async=false;s.onload=next;s.onerror=function(){setTimeout(next,250);};(d.body||d.documentElement).appendChild(s);
  }
  function inject(){
    var f=document.getElementById('app');
    if(!f||started)return !!started;
    try{
      var d=f.contentDocument;
      if(!d||!d.body)return false;
      started=true;
      add(d,'v3EnhancementsLoader','/v3-enhancements.js?v=20260914-6',function(){
        add(d,'v3FixesLoader','/v3-fixes.js?v=20260914-6',function(){
          add(d,'v3FinalFixesLoader','/v3-final-fixes.js?v=20260914-3',function(){
            add(d,'v3LoginPatchLoader','/v3-login-patch.js?v=20260914-2',function(){
              add(d,'v3UiPatchLoader','/v3-ui-patch.js?v=20260914-6',function(){});
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
