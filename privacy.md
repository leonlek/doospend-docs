---
layout: default
title: Privacy Policy — เก๋าตังค์ (Kaotang)
---

# Privacy Policy — เก๋าตังค์ (Kaotang)

_Last updated: 2026-05-27_

## TL;DR

**เก๋าตังค์ เก็บข้อมูลการเงินทุกอย่างไว้บนเครื่องคุณเท่านั้น — เราไม่มี server ของเราเอง, ไม่มี user account online, ไม่ส่งข้อมูลส่วนตัวให้บุคคลที่สาม**

รายการรายรับ-รายจ่าย, บัญชี, บัตรเครดิต, สลิป, งบประมาณ — ทุกอย่างเก็บใน local SwiftData บนเครื่อง iPhone ของคุณ และจะหายไปทันทีเมื่อคุณลบแอป (ยกเว้นถ้าคุณกดสำรองออกไฟล์ .json ด้วยตัวเองก่อน)

---

## ข้อมูลที่เก็บ — บนเครื่องเท่านั้น (On-device only)

### ข้อมูลที่ user ใส่เอง

- **รายการการเงิน** — จำนวนเงิน, หมวด, ร้านค้า, โน้ต, รูปสลิป (ถ้าแนบ), วันที่
- **บัญชี / บัตรเครดิต** — ชื่อบัญชี, icon, สี, ยอดเริ่มต้น, วันตัดรอบ/ครบกำหนด, วงเงิน
- **กฎเงินคืน** — % cashback, points, miles, เพดาน, เงื่อนไข
- **งบประมาณ, ผ่อน, Subscription** — ตั้งค่าตามที่ user สร้าง
- **รูปแนบรายการ** — เก็บใน local database (SwiftData external storage)

### ข้อมูลที่ระบบสร้างให้ on-device

- **AI Usage counter** — นับครั้งที่ใช้ AI scan ในเดือนนั้น (ใช้คำนวณ quota Free/Pro)
- **Weekly insight cache** — สรุปการใช้จ่ายรายสัปดาห์ที่ AI สรุปไว้
- **Subscription detector** — ระบบ on-device ดู pattern transaction หา recurring charges

### App preferences (UserDefaults)

- Theme ที่เลือก (gold / forest / blue / plum)
- Light/Dark mode override
- Onboarding state
- Face ID toggle
- Hide-amounts toggle

---

## ข้อมูลที่ส่งออกนอกเครื่อง

### Anthropic Claude API (เฉพาะเวลาใช้ AI features)

เมื่อ user กด **AI scan slip** / **AI parse text** / **AI parse voice** / **Weekly Insight** / **ScanToPay fraud check** ระบบจะส่งเฉพาะข้อมูลที่จำเป็นไปยัง Anthropic Claude API ผ่าน Cloudflare Worker proxy ของเรา:

- **Slip image** (resized 1568px max, JPEG q=0.85) — AI extract amount + merchant + date
- **Text snippet** ที่ user พิมพ์/พูด — AI parse เป็น transaction
- **QR data** จาก scan-to-pay — AI ตรวจ red flags (fraud check)
- **Recent transactions summary** (ไม่มีรูป, ไม่มี note ส่วนตัว) — สำหรับ Weekly Insight สรุปสัปดาห์

**ที่ Anthropic / Cloudflare Worker ทำ:**
- รัน AI inference, return ผลลัพธ์
- **ไม่บันทึก** prompt/response เพื่อ training
- ข้อมูลผ่านเป็น transit เท่านั้น

**สิทธิ์ของคุณ:**
- ปิด AI features เมื่อไหร่ก็ได้ (ใช้แอปแบบ manual entry)
- ข้อมูลที่ส่งผ่าน API ไม่ผูกกับ identity ส่วนตัว (เราไม่เก็บ user account, ไม่ส่ง email)

### Apple In-App Purchase (StoreKit)

สำหรับ Pro subscription เท่านั้น — ข้อมูลการชำระเงินจัดการโดย Apple ทั้งหมด เราไม่เห็น credit card / Apple ID ของคุณ

---

## ที่ **ไม่** เก็บ / ไม่เก็บแน่นอน

- ❌ **ไม่อ่าน SMS** — ระบบไม่ขอ permission อ่าน SMS แม้แต่ผูก bank
- ❌ **ไม่ผูก bank account** — เก๋าตังค์ไม่เชื่อมต่อ Open Banking / Yodlee / Plaid
- ❌ **ไม่ใช้ Analytics SDK** — ไม่มี Firebase, Mixpanel, Amplitude
- ❌ **ไม่มี crash reporting third-party** — ไม่มี Crashlytics, Sentry
- ❌ **ไม่เก็บ device ID, IDFA, advertising ID**
- ❌ **ไม่เก็บ contact list, full photo library** (ยกเว้นรูปที่ user เลือกเอง)

---

## สิทธิ์ของคุณ

เนื่องจากข้อมูลทุกอย่างอยู่บนเครื่องของคุณ:

- **Export** — Settings → สำรอง & กู้คืน → "สำรองข้อมูล" → ได้ไฟล์ .json ครอบคลุมทุก entity พร้อมรูปแนบ
- **ลบข้อมูล** — ลบแอปออก → ข้อมูลทั้งหมดถูกลบทันที (ไม่มี cloud backup ของเราที่ต้องตามไปลบ)
- **Restore** — Settings → สำรอง & กู้คืน → "กู้คืนจากไฟล์" — กู้คืนได้จากไฟล์ที่เคย export

---

## CloudKit (อนาคต)

เมื่อ KaoTang ออกจาก Personal Team → ระบบจะรองรับ **CloudKit sync** (private database ของคุณเท่านั้น) เพื่อ sync ข้ามเครื่อง iPhone/iPad/Mac ของคุณ — ผ่าน Apple ของคุณเอง ไม่ผ่าน server ของเรา

ก่อนเปิด CloudKit จะมี Privacy Policy update และ user ต้อง opt-in ก่อน

---

## ติดต่อ

มีคำถามเกี่ยวกับ privacy? ส่งเมลมาที่ **support@kaotang.app**
