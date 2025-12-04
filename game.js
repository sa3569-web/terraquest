let randomLocation;
let map;
let marker;

function getRandomLocation() {
    const lat = (Math.random() * 180) - 90;
    const lng = (Math.random() * 360) - 180;
    return { lat, lng };
}

function initGame() {
    randomLocation = getRandomLocation();

    map = new google.maps.Map(document.getElementById("map"), {
        center: randomLocation,
        zoom: 14,
        streetViewControl: true,
        mapTypeId: 'satellite'
    });

    marker = new google.maps.Marker({
        position: randomLocation,
        map: map
    });
}

document.getElementById("guess-btn").onclick = () => {
    const playerGuess = map.getCenter();

    const R = 6371;
    const dLat = (playerGuess.lat() - randomLocation.lat) * Math.PI/180;
    const dLng = (playerGuess.lng() - randomLocation.lng) * Math.PI/180;

    const a = Math.sin(dLat/2)**2 +
              Math.cos(randomLocation.lat*Math.PI/180) *
              Math.cos(playerGuess.lat()*Math.PI/180) *
              Math.sin(dLng/2)**2;

    const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    document.getElementById("result").textContent =
        `You were ${distance.toFixed(2)} km away!`;
};

window.onload = initGame;
