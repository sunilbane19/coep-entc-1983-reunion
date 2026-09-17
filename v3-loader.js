(function(){
  function inject(){
    var f=document.getElementById('app');
    if(!f)return false;
    try{
      var d=f.contentDocument;
      if(!d||!d.body)return false;
      if(d.getElementById('v3EnhancementsLoader'))return true;
      var s=d.createElement('script');s.id='v3EnhancementsLoader';s.src='/v3-enhancements.js?v=20260917-1';d.body.appendChild(s);
      s.addEventListener('load',function(){
        if(d.getElementById('v3FixesLoader'))return;
        var f2=d.createElement('script');f2.id='v3FixesLoader';f2.src='/v3-fixes.js?v=20260917-1';d.body.appendChild(f2);
        f2.addEventListener('load',function(){
          if(d.getElementById('v3FinalFixesLoader'))return;
          var f3=d.createElement('script');f3.id='v3FinalFixesLoader';f3.src='/v3-final-fixes.js?v=20260917-1';d.body.appendChild(f3);
          f3.addEventListener('load',function(){
            if(d.getElementById('v3LoginPatchLoader'))return;
            var f4=d.createElement('script');f4.id='v3LoginPatchLoader';f4.src='/v3-login-patch.js?v=20260917-1';d.body.appendChild(f4);
          });
        });
      });
      return true;
    }catch(e){return false;}
  }
  function start(){var f=document.getElementById('app');if(!f)return;f.addEventListener('load',function(){inject();});if(f.contentDocument&&f.contentDocument.readyState==='complete')inject();var n=0,t=setInterval(function(){if(inject()||++n>20)clearInterval(t);},250);}
  start();
})();
