(function(){
  function inject(){
    var f=document.getElementById('app');
    if(!f)return false;
    try{
      var d=f.contentDocument;
      if(!d||!d.body)return false;
      if(d.getElementById('v3EnhancementsLoader'))return true;
      var s=d.createElement('script');
      s.id='v3EnhancementsLoader';
      s.src='/v3-enhancements.js';
      d.body.appendChild(s);
      s.addEventListener('load',function(){
        if(d.getElementById('v3FixesLoader'))return;
        var f2=d.createElement('script');
        f2.id='v3FixesLoader';
        f2.src='/v3-fixes.js';
        d.body.appendChild(f2);
      });
      return true;
    }catch(e){return false;}
  }
  function start(){
    var f=document.getElementById('app');
    if(!f)return;
    f.addEventListener('load',function(){inject();});
    if(f.contentDocument && f.contentDocument.readyState==='complete')inject();
    var n=0;
    var t=setInterval(function(){
      if(inject()||++n>20)clearInterval(t);
    },250);
  }
  start();
})();
