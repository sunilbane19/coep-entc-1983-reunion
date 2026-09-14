(async function(){
  try{
    const r=await fetch('/',{credentials:'same-origin',cache:'no-store'});
    if(!r.ok) throw new Error('Unable to load the reunion application.');
    let html=await r.text();
    html=html.replace(/<\/body>/i,'<script src="/v3-tools.js"></script></body>');
    document.open();
    document.write(html);
    document.close();
  }catch(e){
    document.body.innerHTML='<div style="font-family:Arial,sans-serif;padding:24px"><h2>Unable to load the reunion application</h2><p>'+String(e.message||e)+'</p></div>';
  }
})();
