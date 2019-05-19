

setTimeout((function () {
  let deferredPrompt;

  console.log(2);

  let installModal = document.getElementById("installModal");
  let installButton = document.getElementById("installButton");

  function showModal() {
    installModal.style.display = 'block';
    installModal.style.opacity = 1;
  }

  function hideModal() {
    installModal.style.display = 'none';
    installModal.style.opacity = 0;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    console.log(3);
    // Update UI notify the user they can add to home screen
    //btnAdd.style.display = 'block';
    showModal();
  });

  installButton.addEventListener('click', (e) => {
    hideModal();
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
}),2000);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
