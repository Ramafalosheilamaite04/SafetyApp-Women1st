let myPosition = null;

// Get location on load
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      myPosition = pos;
      document.getElementById('location').innerText = 
        `Location ready: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
    },
    err => {
      document.getElementById('location').innerText = "Location blocked - alert will still work";
    }
  );
}

function saveKin() {
  let name = document.getElementById('myName').value.trim();
  let kin = document.getElementById('kinName').value.trim();
  let phone = document.getElementById('kinNumber').value.replace(/[^0-9]/g, '');
  let error = document.getElementById('error');

  if (!name) { error.innerText = "Please enter your name"; return; }
  if (!kin) { error.innerText = "Please enter next of kin name"; return; }
  if (phone.length < 10) { error.innerText = "Enter phone like 27735914468"; return; }

  let data = { name: name, kin: kin, phone: phone };
  localStorage.setItem('women1st', JSON.stringify(data));
  showEmergency(data);
}

function showEmergency(data) {
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('emergency').classList.remove('hidden');
  document.getElementById('showName').innerText = data.name;
  document.getElementById('showKin').innerText = data.kin;
  document.getElementById('showPhone').innerText = data.phone;
}

function editKin() {
  document.getElementById('emergency').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
}

function sendAlert() {
  let saved = JSON.parse(localStorage.getItem('women1st'));
  let locLink = myPosition 
    ? `https://maps.google.com/?q=${myPosition.coords.latitude},${myPosition.coords.longitude}`
    : "Location not available - please call me";
  
  let message = `🚨 EMERGENCY ALERT from ${saved.name}: I need help! My location: ${locLink} - Sent via Women 1st App`;
  let url = `https://wa.me/${saved.phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Auto-load if already saved
let saved = localStorage.getItem('women1st');
if (saved) {
  let d = JSON.parse(saved);
  document.getElementById('myName').value = d.name;
  document.getElementById('kinName').value = d.kin;
  document.getElementById('kinNumber').value = d.phone;
  showEmergency(d);
}