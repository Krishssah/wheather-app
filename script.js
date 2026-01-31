const apiKey = "0c885bf74eaf38c61eaaaf46e4ec7461";

function handleKey(e) {
    if (e.key === "Enter") getWeather();
}

function formatTime(unix) {
    return new Date(unix * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function setBackground(weather) {
    let image = "clear";

    if (weather.includes("cloud")) image = "cloudy";
    else if (weather.includes("rain")) image = "rain";
    else if (weather.includes("snow")) image = "snow";
    else if (weather.includes("storm")) image = "storm";

    document.body.style.backgroundImage =
        `url(https://source.unsplash.com/1600x900/?${image},weather)`;
}

function getWeather() {
    const city = document.getElementById("city").value.trim();
    const loading = document.getElementById("loading");
    const box = document.getElementById("weather");

    if (!city) return alert("Enter a city name");

    loading.classList.remove("hidden");
    box.classList.add("hidden");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            document.getElementById("city-name").innerText = data.name;
            document.getElementById("temperature").innerText = `${data.main.temp}°C`;
            document.getElementById("description").innerText = data.weather[0].description;
            document.getElementById("feels").innerText = `Feels like: ${data.main.feels_like}°C`;
            document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").innerText = `Wind: ${data.wind.speed} m/s`;
            document.getElementById("pressure").innerText = `Pressure: ${data.main.pressure} hPa`;
            document.getElementById("sunrise").innerText = `Sunrise: ${formatTime(data.sys.sunrise)}`;
            document.getElementById("sunset").innerText = `Sunset: ${formatTime(data.sys.sunset)}`;

            document.getElementById("icon").src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            setBackground(data.weather[0].description.toLowerCase());

            loading.classList.add("hidden");
            box.classList.remove("hidden");
        })
        .catch(err => {
            loading.classList.add("hidden");
            alert(err.message);
        });
}
