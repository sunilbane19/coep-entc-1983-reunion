(function(){'use strict';
var s=document.createElement('script');
s.src='https://raw.githubusercontent.com/sunilbane19/coep-entc-1983-reunion/44e5918b4c3748a168659ebcc92546088d482c15/v3/v3-admin-tools.js?v=20260917c';
s.onload=function(){
 var st=document.createElement('style');st.id='v3HomeLayoutStyle';st.textContent=`
.home-hero{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)!important;align-items:stretch!important;gap:18px!important}
.home-copy{height:100%!important;min-height:100%!important;padding:28px 30px!important}
.home-photo{height:auto!important;min-height:0!important;padding:0!important;display:block!important;overflow:hidden!important;align-self:stretch!important}
.home-photo img{position:relative!important;inset:auto!important;width:100%!important;height:auto!important;max-height:none!important;aspect-ratio:auto!important;object-fit:contain!important;display:block!important}
.home-photo:before{display:none!important}
.home-photo-caption{position:absolute!important;left:24px!important;bottom:20px!important}
@media(max-width:800px){.home-hero{grid-template-columns:1fr!important;gap:12px!important}.home-photo{order:1!important;height:auto!important}.home-copy{order:2!important;min-height:0!important;height:auto!important;padding:22px 20px!important}.home-photo img{width:100%!important;height:auto!important;max-height:none!important}.home-photo-caption{left:16px!important;bottom:12px!important;font-size:20px!important}}
@media(max-width:520px){.home-copy{min-height:0!important}.home-photo{height:auto!important}.home-photo img{height:auto!important;width:100%!important;object-fit:contain!important}.home-copy h2{font-size:32px}.home-copy p{font-size:15px;line-height:1.5}}
`;
 document.head.appendChild(st);
 function applyHeroImage(){
  var imgs=document.querySelectorAll('.home-photo img');
  imgs.forEach(function(img){
   var exact='/v3/Gang%20COEP%20Header.jpg?v=20260917c';
   if(img.getAttribute('src')!==exact){img.setAttribute('src',exact);}
   img.removeAttribute('srcset');
   img.setAttribute('data-exact-home-photo','Gang COEP Header.jpg');
   img.style.width='100%';img.style.height='auto';img.style.objectFit='contain';
  });
 }
 applyHeroImage();
 var observer=new MutationObserver(function(){applyHeroImage();});
 observer.observe(document.body,{childList:true,subtree:true});
 setInterval(applyHeroImage,1000);
};
document.head.appendChild(s);
})();