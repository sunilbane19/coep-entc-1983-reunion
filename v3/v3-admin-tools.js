(function(){
  'use strict';
  var STYLE_ID='v3AdminToolsStyle';
  var BUTTONS_ID='v3AdminToolsButtons';
  function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});}
  function currentRows(){
    var rows=(window.adminMembers||[]).slice();
    var q=(document.getElementById('adminQ')?.value||'').toLowerCase().trim();
    if(q) rows=rows.filter(function(m){return [m.full_name,m.preferred_name,m.mobile,m.whatsapp_phone,m.email,m.current_city,m.current_state,m.current_country,m.profession,m.company].some(function(v){return String(v||'').toLowerCase().includes(q);});});
    var f=window.adminFilter||'all';
    if(f==='complete') rows=rows.filter(function(m){return !!m.profile_completed;});
    if(f==='pending') rows=rows.filter(function(m){return !m.profile_completed;});
    if(f==='admins') rows=rows.filter(function(m){return (window.adminRoles||{})[m.id]==='admin';});
    return rows;
  }
  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var s=document.createElement('style');s.id=STYLE_ID;
    s.textContent='.v3-admin-tools{display:flex;gap:7px;align-items:center;margin-top:12px;flex-wrap:wrap}.v3-admin-tools .btn{padding:8px 12px;font-size:12px;white-space:nowrap}@media(max-width:700px){.v3-admin-tools{gap:5px}.v3-admin-tools .btn{padding:7px 9px;font-size:11px}}';
    document.head.appendChild(s);
  }
  function addButtons(){
    var filters=document.querySelector('.admin-filters');
    if(!filters||!window.adminMembers||document.getElementById(BUTTONS_ID)) return;
    ensureStyle();
    var wrap=document.createElement('div');wrap.id=BUTTONS_ID;wrap.className='v3-admin-tools';
    var ex=document.createElement('button');ex.className='btn';ex.type='button';ex.textContent='Export Excel';ex.onclick=exportExcel;
    var pr=document.createElement('button');pr.className='btn secondary';pr.type='button';pr.textContent='Print';pr.onclick=printList;
    wrap.appendChild(ex);wrap.appendChild(pr);filters.insertAdjacentElement('afterend',wrap);
  }
  function ensureExcelJS(done){
    if(window.ExcelJS){done();return;}
    var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js';s.onload=done;s.onerror=function(){alert('Excel export could not load. Please check your internet connection and try again.');};document.head.appendChild(s);
  }
  async function exportExcel(){
    var rows=currentRows();
    ensureExcelJS(async function(){
      var wb=new ExcelJS.Workbook();
      var ws=wb.addWorksheet('Class List');
      ws.mergeCells('A1:F1');ws.getCell('A1').value='COEP ENTC 1983 — Class Reunion';
      ws.getCell('A1').font={name:'Georgia',size:16,bold:true};ws.getCell('A1').alignment={vertical:'middle'};ws.getRow(1).height=24;
      ws.mergeCells('A2:F2');
      var filterText=(window.adminFilter||'all')+' • '+rows.length+' record'+(rows.length===1?'':'s')+' • '+new Date().toLocaleDateString('en-IN');
      ws.getCell('A2').value='Filter: '+filterText+(document.getElementById('adminQ')?.value?' • Search: '+document.getElementById('adminQ').value:'');
      ws.getCell('A2').font={italic:true,color:{argb:'FF806D59'}};
      ws.addRow(['S.N.','Name','Address','Town / City','Phone No.','Email']);
      var hr=ws.getRow(3);hr.font={bold:true};hr.alignment={vertical:'middle',horizontal:'center',wrapText:true};
      hr.eachCell(function(c){c.border={top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}};});
      rows.forEach(function(m,i){var r=ws.addRow([i+1,m.full_name||m.preferred_name||'',m.detailed_address||'', [m.current_city,m.current_state,m.current_country].filter(Boolean).join(', '),m.mobile||m.whatsapp_phone||'',m.email||'']);r.alignment={vertical:'top',wrapText:true};r.eachCell(function(c){c.border={top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}};});});
      [8,28,42,28,20,34].forEach(function(w,i){ws.getColumn(i+1).width=w;});ws.views=[{state:'frozen',ySplit:3}];ws.autoFilter={from:'A3',to:'F'+Math.max(3,rows.length+3)};
      var blob=await wb.xlsx.writeBuffer();var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([blob],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));var f=window.adminFilter||'all';var d=new Date().toISOString().slice(0,10);a.download='COEP_ENTC_1983_'+f+'_'+d+'.xlsx';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href);},1000);
    });
  }
  function printList(){
    var rows=currentRows();var q=document.getElementById('adminQ')?.value||'';var f=window.adminFilter||'all';
    var w=window.open('','_blank','width=1100,height=800');if(!w){alert('Please allow pop-ups for the reunion site to print.');return;}
    var html='<!doctype html><html><head><title>COEP ENTC 1983 — Class Reunion</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:Arial,sans-serif;color:#222;font-size:11px}h1{font-family:Georgia,serif;margin:0 0 4px;font-size:20px}p{margin:0 0 12px;color:#666}table{width:100%;border-collapse:collapse}th,td{border:1px solid #bbb;padding:6px 7px;vertical-align:top;text-align:left}th{background:#f3ead9;font-weight:700}th:nth-child(1),td:nth-child(1){width:6%}th:nth-child(2),td:nth-child(2){width:20%}th:nth-child(3),td:nth-child(3){width:29%}th:nth-child(4),td:nth-child(4){width:18%}th:nth-child(5),td:nth-child(5){width:13%}th:nth-child(6),td:nth-child(6){width:20%}.toolbar{display:flex;gap:8px;margin-bottom:14px}.toolbar button{padding:7px 12px}@media print{.toolbar{display:none}}</style></head><body><div class="toolbar"><button onclick="window.print()">Print</button><button onclick="window.close()">Exit</button></div><h1>COEP ENTC 1983 — Class Reunion</h1><p>'+esc(new Date().toLocaleDateString('en-IN'))+' • Filter: '+esc(f)+(q?' • Search: '+esc(q):'')+' • '+rows.length+' record'+(rows.length===1?'':'s')+'</p><table><thead><tr><th>S.N.</th><th>Name</th><th>Address</th><th>Town / City</th><th>Phone No.</th><th>Email</th></tr></thead><tbody>';
    html+=rows.map(function(m,i){return '<tr><td>'+(i+1)+'</td><td>'+esc(m.full_name||m.preferred_name||'')+'</td><td>'+esc(m.detailed_address||'')+'</td><td>'+esc([m.current_city,m.current_state,m.current_country].filter(Boolean).join(', '))+'</td><td>'+esc(m.mobile||m.whatsapp_phone||'')+'</td><td>'+esc(m.email||'')+'</td></tr>';}).join('')+'</tbody></table></body></html>';
    w.document.open();w.document.write(html);w.document.close();
  }
  function install(){addButtons();}
  var n=0,t=setInterval(function(){install();if(++n>40)clearInterval(t);},250);install();
  document.addEventListener('input',function(e){if(e.target&&e.target.id==='adminQ')setTimeout(addButtons,0);});
  var mo=new MutationObserver(function(){addButtons();});mo.observe(document.body,{childList:true,subtree:true});
})();
