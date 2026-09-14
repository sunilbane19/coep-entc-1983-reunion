(function(){
  function install(){
    var b=document.getElementById('v3SendLink')||Array.from(document.querySelectorAll('button')).find(function(x){return x.textContent.trim()==='Send sign-in link';});
    if(!b||b.dataset.v3LoginFixed)return;
    var n=b.cloneNode(true);n.id='v3SendLink';n.dataset.v3LoginFixed='1';b.parentNode.replaceChild(n,b);
    n.addEventListener('click',function(){if(typeof window.v3SendLink==='function')window.v3SendLink();});
  }
  install();setTimeout(install,300);setTimeout(install,1000);setInterval(install,1000);
})();
