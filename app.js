let map;
let userLat = 0, userLng = 0;

window.initMap = function () {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: userLat, lng: userLng },
        zoom: 6,
        styles: [ /* Insert dark theme map styles here if desired */ ],
      });

      new google.maps.Marker({
        position: { lat: userLat, lng: userLng },
        map,
        title: "Your Location",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
      });

      loadRadioStations();
      document.getElementById("loading-screen").classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");
    },
    () => {
      alert("Location access is required.");
      document.getElementById("loading-status").innerText = "Location denied. Please reload.";
    }
  );
};

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(`${tabName}-tab`).classList.remove('hidden');
}

async function loadRadioStations() {
  const res = await fetch("https://de1.api.radio-browser.info/json/stations/topclick/5");
  const stations = await res.json();
  const tab = document.getElementById("radio-tab");

  tab.innerHTML = stations.map(station => `
    <div>
      <strong>${station.name}</strong> (${station.country})
      <button onclick="playStation('${station.url_resolved}', '${station.name}')">Play</button>
    </div>
  `).join("");
}

function playStation(url, name) {
  const player = document.getElementById("player");
  document.getElementById("station-name").innerText = `Now Playing: ${name}`;
  player.src = url;
  player.play();
}
