const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=ec0710ec81f23f2a17857b3562f3c792";
const API_UNITS = "&units=metric";

const getWeather = () => {
	const city = input.value || "Vancouver";
	// poniżej budowa linku
	const URL = API_LINK + city + API_KEY + API_UNITS;

	// w zmiennej temp przechowujemy temperature
	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			// operatorem rest rozsmarowuje każdy pojedynczy element obiektu
			const status = Object.assign({}, ...res.data.weather);
			console.log(status.id);

			// po wypisaniu poprawnej nazwy miasta usunie nam błąd złapany przez .catch
			warning.textContent = "";
			input.value = "";

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + "℃";
			humidity.textContent = hum + "%";
			// wyświetla nam napis statusu pogody
			weather.textContent = status.main;

			// zmiana ikonek pogodowych
			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute("src", "./img/thunderstorm.png");
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute("src", "./img/drizzle.png");
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute("src", "./img/rain.png");
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute("src", "./img/ice.png");
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute("src", "./img/fog.png");
			} else if (status.id === 800) {
				photo.setAttribute("src", "./img/sun.png");
			} else if (status.id > 800 && status.id < 900) {
				photo.setAttribute("src", "./img/cloud.png");
			} else {
				photo.setAttribute("src", "./img/unknown.png");
			}
		})
		.catch(() => (warning.textContent = "Podaj poprawną nazwę miasta!"));
};



// wywołanie funkcji po wciśnięciu enter
const enter = e => {
	if (e.key === "Enter") {
		getWeather();
	}
};

input.addEventListener('keyup', enter)
button.addEventListener("click", getWeather);
getWeather();

