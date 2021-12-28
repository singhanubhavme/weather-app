const onClick = () => {
	const place = document.getElementById('place').value;
	const url = `http://api.weatherapi.com/v1/current.json?key=1b8676ab83734bf88d592311210410&q=${place}&aqi=no`;

	const showData = (data) => {
		const {
			location,
			current
		} = data;

		const time = location.localtime;
		const name = location.name;
		const region = location.region;
		const weather_icon_url = current.condition.icon;
		const weather_text = current.condition.text;
		const temp_c = current.temp_c;
		const visibility_km = current.vis_km;
		const wind_speed = current.wind_kph;

		document.getElementById('show').innerHTML = `<div class="weather-data">
		    <div class="left">
		    <div class="line1">
		        ${name} District, ${region} Weather
		    </div>
		    <div class="line2">
		        As of ${time}
		    </div>
		    <div class="temp">
		        ${temp_c}<sup>o</sup> C
		    </div>
		    <div class="weather-text">
		        ${weather_text}
		    </div>
		    <div class="visibility-km">
		        Visibility is ${visibility_km} KMs
		    </div>
		    <div class="wind-speed">
		        Wind speed is ${wind_speed} KMPH
		    </div>
		</div>
		<div class="right"><br>
            <img src="${weather_icon_url}" alt="">
		    </div>
		</div>
		</div>`;
	}

	const notFound = () => {
		document.getElementById('show').innerHTML = `
		<div class="weather-data">	
		    <div class="center">
		    Location Not Found
			</div>
		</div>`;
	}

	const fetchData = async () => await fetch(url);

	fetchData()
		.then((res) => res.json())
		.then((data) => showData(data))
		.catch(() => notFound());
}

const autofillAtStart = () => {
	place.value = 'Dehradun';
	onClick();
}

window.onload = autofillAtStart();