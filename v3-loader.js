(function(){
  function add(d,id,src){
    if(d.getElementById(id))return null;
    var s=d.createElement('script');s.id=id;s.src=src;s.async=false;d.body.appendChild(s);return s;
  }
  function inject(){
    var f=document.getElementById('app');
    if(!f)return false;
    try{
      var d=f.contentDocument;
      if(!d||!d.body)return false;
      if(d.getElementById('v3UiPatchLoader'))return true;
      var s=add(d,'v3EnhancementsLoader','/v3-enhancements.js?v=20260914-5');
      if(!s)return false;
      s.addEventListener('load',function(){
        var f2=add(d,'v3FixesLoader','/v3-fixes.js?v=20260914-5');
        if(!f2)return;
        f2.addEventListener('load',function(){
          var f3=add(d,'v3FinalFixesLoader','/v3-final-fixes.js?v=20260914-3');
          if(!f3)return;
          f3.addEventListener('load',function(){
            var f4=add(d,'v3LoginPatchLoader','/v3-login-patch.js?v=20260914-2');
            if(!f4)return;
            f4.addEventListener('load',function(){
              add(d,'v3UiPatchLoader','/v3-ui-patch.js?v=20260914-6');
            });
          });
        });
      });
      return true;
    }catch(e){return false;}
  }
  function start(){
    var f=document.getElementById('app');if(!f)return;
    f.addEventListener('load',function(){inject();});
    var n=0,t=setInterval(function(){if(inject()||++n>40)clearInterval(t);},250);
  }
  start();
})();
