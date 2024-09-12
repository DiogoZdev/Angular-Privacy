import { Injectable } from "@angular/core";
import { environment } from "../../environments/env";
import { KELVIN_DIFF } from "../core/constants/measures";

@Injectable({
    providedIn: 'root'
})
export class TemperatureService {

    private key = environment.WEATHER_API_KEY;

    async fetchTemperature({ latitude, longitude }: { latitude: number; longitude: number }) {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
                latitude
            }&lon=${longitude}&appid=${this.key}`,
        )

        const data = await res.json();
        if (data.cod === 200) {
            return (Math.round(data.main.temp - KELVIN_DIFF)+'º');
        }
        return '0.00';
    }
}
