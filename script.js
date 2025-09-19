// script.js — POC for admin page
(() => {
  // Avoid multiple inserts
  if (document.getElementById('poc-badge')) return;

  // 1️⃣ Badge مرئي
  const badge = document.createElement('div');
  badge.id = 'poc-badge';
  badge.textContent = 'POC SCRIPT RUNNING';
  Object.assign(badge.style, {
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: 'red',
    color: 'white',
    padding: '6px 12px',
    fontWeight: 'bold',
    zIndex: '9999',
    borderRadius: '6px'
  });
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(badge);
  });

  // 2️⃣ تغيير عنوان الصفحة
  document.title = '[POC ACTIVE] ' + document.title;

  // 3️⃣ إرسال POST داخلي للسيرفر كدليل
  const formData = new URLSearchParams();
  formData.append('reportedUser', 'poctest'); // أي اسم لتثبت الإرسال
  fetch('/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  })
  .then(res => console.log('POC POST sent:', res.status))
  .catch(err => console.error('POC POST error:', err));
})();
