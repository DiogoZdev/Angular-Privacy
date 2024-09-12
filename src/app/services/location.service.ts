import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IPosition } from "../core/interfaces/position.interface";

@Injectable({
    providedIn: 'root'
})
export class locationService {

    private position = new BehaviorSubject<IPosition>({
        latitude: 0,
        longitude: 0
    })

    getLocation() {
        return this.position.asObservable();
    }

    fetchLocation() {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.position.next({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });
            console.log(pos)
        });
      }
}
