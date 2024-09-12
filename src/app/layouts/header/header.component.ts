import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { TemperatureService } from '../../services/temperature.service';
import { Subject, takeUntil } from 'rxjs';
import { locationService } from '../../services/location.service';
import { THIRTY_SECONDS } from '../../core/constants/time';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        FontAwesomeModule,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
    faGithub = faGithub;
    currentTemperature = signal('0.00');
    private unsubscribeAll = new Subject<void>()
    private location = signal({
        latitude: 0,
        longitude: 0
    });

    constructor(
        private readonly temperatureService: TemperatureService,
        private readonly locationService: locationService
    ) {}

    ngOnInit() {
        this.locationService.getLocation()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((pos) => {
                this.location.set(pos);
                this.getTemperature();
            }
        );
        this.locationService.fetchLocation();

        setInterval(() => {
            this.getTemperature()
        }, THIRTY_SECONDS)


    }

    async getTemperature() {
        const temperature = await this.temperatureService.fetchTemperature({
            latitude: this.location().latitude,
            longitude: this.location().longitude
        });
        this.currentTemperature.set(temperature);
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
