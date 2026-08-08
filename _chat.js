/* ปุ่มแชทลอย (FAB) — ใช้ร่วมกันทุกหน้า
 *
 * ตั้งค่าที่เดียว: ใส่ลิงก์ในบล็อกข้างล่างนี้ · **ช่องที่เว้นว่าง จะไม่ถูกสร้างปุ่ม**
 * เพราะปุ่มที่กดแล้วไปหน้าเสียแย่กว่าไม่มีปุ่ม พอใส่ลิงก์แล้วปุ่มจะขึ้นเองทันที
 *
 * ตั้งใจใช้ "ลิงก์ธรรมดา + ไอคอน SVG ฝังในไฟล์" ไม่ใช่ปลั๊กอินแชทของ Facebook/LINE:
 * ปลั๊กอินพวกนั้นโหลดสคริปต์ของแพลตฟอร์มเข้ามา = tracking ซึ่งขัดกับหน้า
 * "ความเป็นส่วนตัว" ของเราเองที่เขียนไว้ว่าไม่ใช้ analytics/tracking SDK
 */
(function () {
  'use strict';

  var CHANNELS = [
    // LINE Official Account @464uvacf — %40 คือ @ ที่เข้ารหัสแล้ว (รูปแบบที่ LINE ใช้เอง)
    { id: 'line', label: 'คุยทาง LINE', url: 'https://line.me/R/ti/p/%40464uvacf', color: '#06C755',
      icon: '<path d="M12 2C6.5 2 2 5.6 2 10.1c0 4 3.6 7.4 8.4 8 .3.1.8.2.9.5.1.3.1.7 0 1l-.2.9c0 .3-.2 1 .9.6 1.1-.5 6-3.5 8.2-6C21.6 13.4 22 11.8 22 10.1 22 5.6 17.5 2 12 2ZM8.1 12.6H6.2c-.3 0-.5-.2-.5-.5V8.3c0-.3.2-.5.5-.5s.5.2.5.5v3.3h1.4c.3 0 .5.2.5.5s-.2.5-.5.5Zm2-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.3c0-.3.2-.5.5-.5s.5.2.5.5v3.8Zm4.4 0c0 .2-.1.4-.4.5h-.2c-.2 0-.3-.1-.4-.2l-1.9-2.6v2.3c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.3c0-.2.1-.4.4-.5h.2c.1 0 .3.1.4.2l1.9 2.6V8.3c0-.3.2-.5.5-.5s.5.2.5.5v3.8Zm3.1-2.4c.3 0 .5.2.5.5s-.2.5-.5.5h-1.4v.9h1.4c.3 0 .5.2.5.5s-.2.5-.5.5h-1.9c-.3 0-.5-.2-.5-.5V8.3c0-.3.2-.5.5-.5h1.9c.3 0 .5.2.5.5s-.2.5-.5.5h-1.4v.9h1.4Z"/>' },
    // Facebook Page 'doospend'
    //
    // Facebook Page (รหัสเพจ 61591609032895 — เพจรุ่นใหม่ที่ไม่มี username)
    //
    // ใช้ **รหัสตัวเลข** ไม่ใช่ชื่อ: m.me/doospend ใช้ไม่ได้เพราะ "doospend" เป็นชื่อเพจ
    // ไม่ใช่ชื่อผู้ใช้ (เพจนี้ไม่มี username เลย URL เป็น profile.php?id=…)
    // ตรวจแล้ว m.me/61591609032895 ตอบ 302 ไป m.facebook.com/msg/… = เข้าห้องแชทตรงจริง
    { id: 'messenger', label: 'คุยทาง Messenger', url: 'https://m.me/61591609032895', color: '#0866FF',
      icon: '<path d="M12 2C6.4 2 2.2 6.1 2.2 11.6c0 2.9 1.2 5.4 3.1 7.1.2.2.3.4.3.6l.1 1.8c0 .6.6 1 1.1.7l2-.9c.2-.1.4-.1.6-.1 1 .3 2 .4 3.1.4 5.6 0 9.8-4.1 9.8-9.6S17.6 2 12 2Zm5.9 7.4-2.9 4.6c-.5.7-1.4.9-2.1.4l-2.3-1.7c-.2-.2-.5-.2-.7 0l-3.1 2.4c-.4.3-.9-.2-.7-.6l2.9-4.6c.5-.7 1.4-.9 2.1-.4l2.3 1.7c.2.2.5.2.7 0l3.1-2.4c.4-.3.9.2.7.6Z"/>' },
    // อีเมล — มีอยู่แล้ว จึงเป็นช่องทางสำรองที่ทำงานได้ตั้งแต่วันนี้
    { id: 'email', label: 'ส่งอีเมล', url: 'mailto:apiwat.pe@gmail.com', color: '#2E7D5F',
      icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Zm8 7.2 8-4.7V6H4v.5l8 4.7Zm0 2.3-8-4.7V18h16V8.8l-8 4.7Z"/>' }
  ];

  var live = CHANNELS.filter(function (c) { return c.url; });
  if (!live.length) return;

  // สไตล์อยู่ในไฟล์นี้ ไม่ใช่ _shared.css — **หน้าแรกไม่ได้โหลด _shared.css**
  // (มี <style> ของตัวเอง) ปุ่มจึงเคยไปกองท้ายหน้าแบบไม่มีสไตล์. ให้ widget
  // ถือสไตล์ของตัวเองไปเลย จะได้ทำงานเหมือนกันทุกหน้าไม่ว่าหน้านั้นใช้ CSS ชุดไหน
  var css = document.createElement('style');
  css.textContent = [
    '.chatfab{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));',
      'z-index:70;display:flex;flex-direction:column;align-items:flex-end;gap:10px;',
      'font-family:inherit;transition:opacity .18s ease,transform .18s ease}',
    '.chatfab.is-hidden{opacity:0;transform:translateY(12px);pointer-events:none}',
    '.chatfab-list{display:flex;flex-direction:column;align-items:flex-end;gap:8px}',
    // `display` ชนะ attribute `hidden` เสมอ — ต้องปิดเองให้ชัด ไม่งั้นกางค้างตั้งแต่โหลดหน้า
    '.chatfab-list[hidden]{display:none}',
    '.chatfab-item{display:flex;align-items:center;gap:8px;padding:9px 14px 9px 11px;',
      'background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:999px;',
      'box-shadow:0 6px 18px rgba(0,0,0,.14);font-size:15px;font-weight:600;line-height:1;',
      'color:#1C1C1E;text-decoration:none;white-space:nowrap}',
    '.chatfab-item:hover{background:#F6F8F7}',
    '.chatfab-btn{width:56px;height:56px;display:grid;place-items:center;border:0;',
      'border-radius:50%;background:#2E7D5F;box-shadow:0 8px 22px rgba(0,0,0,.22);',
      'cursor:pointer;-webkit-tap-highlight-color:transparent}',
    '.chatfab-close{display:none}',
    '.chatfab.is-open .chatfab-open{display:none}',
    '.chatfab.is-open .chatfab-close{display:block}',
    '@media (prefers-color-scheme:dark){',
      '.chatfab-item{background:#1A2422;border-color:rgba(255,255,255,.10);color:#E8EDEB}',
      '.chatfab-item:hover{background:#22302D}}',
    '@media (prefers-reduced-motion:reduce){.chatfab{transition:none}}'
  ].join('');
  document.head.appendChild(css);

  function svg(path, color) {
    return '<svg viewBox="0 0 24 24" width="22" height="22" fill="' + color + '" aria-hidden="true">' + path + '</svg>';
  }

  // บนมือถือ **ห้ามเปิดแท็บใหม่**: ลิงก์พวกนี้ต้องสลับไปเปิดแอป (Messenger/LINE)
  // แท็บใหม่ที่เพิ่งเปิดมักไม่ได้รับ user-gesture ต่อ เบราว์เซอร์เลยไม่ยิง intent —
  // อาการคือแท็บค้างหมุนครึ่งเดียวแล้วไม่เปิดแอป (เคสจริงบน Messenger)
  // บนเดสก์ท็อปเปิดแท็บใหม่ได้ เพราะจบที่หน้าเว็บ ไม่ต้องสลับแอป และผู้ใช้ไม่เสียหน้าเดิม
  var newTab = !(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  var root = document.createElement('div');
  root.className = 'chatfab';
  root.innerHTML =
    '<div class="chatfab-list" hidden>' +
      live.map(function (c) {
        // rel=noopener: เปิดแท็บใหม่โดยไม่ให้หน้าปลายทางอ้างถึงหน้าเราได้
        return '<a class="chatfab-item" href="' + c.url + '"' +
               (c.id !== 'email' && newTab ? ' target="_blank" rel="noopener"' : '') + '>' +
               svg(c.icon, c.color) + '<span>' + c.label + '</span></a>';
      }).join('') +
    '</div>' +
    '<button class="chatfab-btn" type="button" aria-expanded="false" aria-label="คุยกับเรา">' +
      '<svg class="chatfab-open" viewBox="0 0 24 24" width="26" height="26" fill="#fff" aria-hidden="true">' +
        '<path d="M12 3c5 0 9 3.4 9 7.6 0 4.2-4 7.6-9 7.6-.9 0-1.8-.1-2.6-.3l-4 1.9c-.4.2-.9-.2-.8-.7l.7-3C3.3 14.8 3 12.8 3 10.6 3 6.4 7 3 12 3Z"/>' +
      '</svg>' +
      '<svg class="chatfab-close" viewBox="0 0 24 24" width="24" height="24" fill="#fff" aria-hidden="true">' +
        '<path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3z"/>' +
      '</svg>' +
    '</button>';
  document.body.appendChild(root);

  var btn = root.querySelector('.chatfab-btn');
  var list = root.querySelector('.chatfab-list');

  function setOpen(on) {
    root.classList.toggle('is-open', on);
    btn.setAttribute('aria-expanded', String(on));
    list.hidden = !on;
  }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!root.classList.contains('is-open'));
  });
  document.addEventListener('click', function (e) { if (!root.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  // ซ่อนตัวเองตอนบล็อก CTA ท้ายหน้าโผล่ — ไม่งั้นปุ่มจะไปทับปุ่ม App Store
  // บนจอมือถือพอดี ซึ่งเป็นปุ่มที่ทั้งหน้ามีไว้เพื่อให้กด
  var cta = document.getElementById('download');
  if (cta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        root.classList.toggle('is-hidden', en.isIntersecting);
        if (en.isIntersecting) setOpen(false);
      });
    }, { threshold: 0.15 }).observe(cta);
  }
})();
