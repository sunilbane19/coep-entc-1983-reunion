(function(){'use strict';
var s=document.createElement('script');
s.src='https://raw.githubusercontent.com/sunilbane19/coep-entc-1983-reunion/44e5918b4c3748a168659ebcc92546088d482c15/v3/v3-admin-tools.js';
s.onload=function(){
 var st=document.createElement('style');st.id='v3HomeLayoutStyle';st.textContent=`
.home-hero{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:stretch;gap:18px}
.home-copy{height:100%;min-height:100%;padding:28px 30px}
.home-photo{height:auto;min-height:0;padding:0;display:block;overflow:hidden;align-self:stretch}
.home-photo img{position:relative;inset:auto;width:100%;height:auto;aspect-ratio:auto;object-fit:contain;display:block}
.home-photo:before{display:none}
.home-photo-caption{position:absolute;left:24px;bottom:20px}
.v3-header-separated{align-items:flex-start!important;flex-wrap:wrap!important}
.v3-header-separated>.nav{margin-left:auto!important}
.v3-header-separated>.signedin{flex-basis:100%!important;width:100%!important;justify-content:flex-end!important}
@media(max-width:800px){.home-hero{grid-template-columns:1fr;gap:12px}.home-photo{order:1;height:auto}.home-copy{order:2;min-height:0;height:auto;padding:22px 20px}.home-photo img{width:100%;height:auto;display:block}.home-photo-caption{left:16px;bottom:12px;font-size:20px}}
@media(max-width:700px){.v3-header-separated{display:block!important}.v3-header-separated>.nav{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;justify-content:space-between!important;width:100%!important;margin-top:7px!important}.v3-header-separated>.signedin{display:flex!important;flex-basis:100%!important;width:100%!important;justify-content:flex-start!important;padding:6px 5px 0!important;margin-top:2px!important}}
@media(max-width:520px){.home-copy{min-height:0}.home-photo{height:auto}.home-photo img{height:auto;width:100%;object-fit:contain}.home-copy h2{font-size:32px}.home-copy p{font-size:15px;line-height:1.5}}`;
 document.head.appendChild(st);
 var photoData='data:image/jpeg;base64,"+b64+"';
 var tries=0;
 function setHomePhoto(){var img=document.querySelector('.home-photo img');if(img){img.src=photoData;img.removeAttribute('srcset');return true;}return false;}
 var timer=setInterval(function(){if(setHomePhoto()||++tries>80)clearInterval(timer);},250);
 setHomePhoto();
};document.head.appendChild(s);
})();