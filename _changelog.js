/**
 * **หน้า "มีอะไรใหม่" วาดจาก `changelog.json` ตอนเปิดหน้า — ไม่พิมพ์ซ้ำด้วยมือ**
 * (เจ้าของเคาะ 11 ก.ย. 69)
 *
 * `changelog.json` เป็นไฟล์เดียวกับที่**แอปอ่านตอนเปิด** เพื่อโชว์ "มีอะไรใหม่" และมี
 * คำแปลอังกฤษอยู่ในตัว (คีย์ `en` ทุกเวอร์ชัน) · การวาดจากไฟล์นั้นตรง ๆ ได้สามอย่างพร้อมกัน:
 *
 * 1. **ความจริงมีที่เดียว** — แอปกับเว็บอ่านไฟล์เดียวกัน เพี้ยนจากกันไม่ได้
 *    (วันนี้เพิ่งเจอของจริงมาแล้ว: ข้อความ FAQ ถูกเก็บสองที่ในไฟล์เดียว แก้ที่หนึ่งแล้ว
 *     อีกที่ยังโฆษณาของเก่า)
 * 2. **ไม่ต้องอัปเดตหน้าเว็บอีกเลย** — ปล่อยเวอร์ชันใหม่ deploy JSON แล้วหน้าขึ้นเอง
 * 3. **สองภาษาฟรี** — อ่าน `<html lang>` เหมือนที่ `_chat.js` ทำ
 *
 * ไฟล์นี้ทำสองงาน แล้วแต่ว่าหน้านั้นมีที่ให้วางอะไร:
 * - `#clList` มี  → วาดรายการทั้งหมด (หน้า changelog)
 * - `#clFoot` มี  → เติมแค่ "อัปเดตล่าสุด vX.Y.Z" (footer ของหน้า landing)
 */
(function () {
  'use strict';

  var EN = (document.documentElement.lang || 'th').slice(0, 2) === 'en';
  function t(th, en) { return EN ? en : th; }

  var list = document.getElementById('clList');
  var foot = document.getElementById('clFoot');
  if (!list && !foot) return;

  // path เต็มจากราก — หน้านี้อยู่ได้ทั้ง / และ /en/ ซึ่ง path สัมพัทธ์จะชี้คนละที่
  fetch('/changelog.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .then(function (data) {
      var versions = (data && data.versions) || [];
      if (!versions.length) throw 0;
      if (foot) renderFoot(versions[0]);
      if (list) renderList(versions);
    })
    .catch(function () {
      // **ล้มแล้วต้องไม่เหลือจอว่างเปล่า** — บอกตรง ๆ แล้วให้ทางไปต่อ
      if (list) {
        list.innerHTML = '<p class="clerr">' +
          t('โหลดรายการอัปเดตไม่สำเร็จ · ดูได้ที่หน้า App Store ของแอป',
            'Could not load the update list · you can read it on the App Store page') +
          '</p>';
      }
      if (foot) foot.textContent = '';
    });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /** ข้อความของเวอร์ชันหนึ่ง ตามภาษาที่หน้าใช้ — ไม่มี `en` ก็ถอยไปใช้ไทย (ไม่ปล่อยว่าง) */
  function pick(v) {
    var e = EN && v.en ? v.en : v;
    return {
      title: e.title || v.title || '',
      date: e.date || v.date || '',
      items: e.items || v.items || [],
    };
  }

  function renderFoot(v) {
    foot.textContent = t('อัปเดตล่าสุด v', 'Latest update v') + v.version;
  }

  function renderList(versions) {
    var out = versions.map(function (v, i) {
      var c = pick(v);
      // `title` ในไฟล์เป็นหลายบรรทัดคั่นด้วย \n — พาดหัวย่อยของรอบนั้น
      var heads = String(c.title).split('\n').filter(function (x) { return x.trim(); });
      return '<article class="clv">' +
        '<div class="clv-h">' +
          '<span class="clv-v">v' + esc(v.version) + '</span>' +
          (i === 0 ? '<span class="clv-new">' + t('ล่าสุด', 'latest') + '</span>' : '') +
          '<span class="clv-d">' + esc(c.date) + '</span>' +
        '</div>' +
        (heads.length ? '<div class="clv-t">' + heads.map(esc).join('<br>') + '</div>' : '') +
        (c.items.length
          ? '<ul class="clv-i">' + c.items.map(function (x) {
              return '<li>' + esc(x) + '</li>';
            }).join('') + '</ul>'
          : '') +
        '</article>';
    }).join('');
    list.innerHTML = out;
  }
})();
