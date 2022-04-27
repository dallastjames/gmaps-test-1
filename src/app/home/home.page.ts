import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: GoogleMap;
  marker: string;
  mapState: 0 | 1 = 0;
  markerState: 0 | 1 = 0;

  constructor() {}

  @ViewChild('mapRef')
  set mapRef(ref: ElementRef<HTMLElement>) {
    setTimeout(() => {
      this.createMap(ref.nativeElement);
    }, 500);
  }

  async createMap(ref: HTMLElement) {
    this.map = await GoogleMap.create({
      id: 'my-cool-map',
      apiKey: environment.mapsKey,
      element: ref,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
      forceCreate: true,
    });
  }

  async addMarker() {
    if (!!this.marker) {
      return;
    }
    this.marker = await this.map.addMarker({
      coordinate: {
        lat: 33.6,
        lng: -117.9,
      },
    });
  }

  async moveMap() {
    if (this.mapState === 0) {
      this.mapState = 1;
      await this.map.setCamera({
        coordinate: {
          lat: 43.6,
          lng: -116.2,
        },
      });
    } else {
      this.mapState = 0;
      await this.map.setCamera({
        coordinate: {
          lat: 33.6,
          lng: -117.9,
        },
      });
    }
  }

  async moveMarker() {
    if (!this.marker) {
      return;
    }
    await this.map.removeMarker(this.marker);
    if (this.markerState === 0) {
      this.markerState = 1;
      this.marker = await this.map.addMarker({
        coordinate: {
          lat: 43.6,
          lng: -116.2,
        },
      });
    } else {
      this.markerState = 0;
      this.marker = await this.map.addMarker({
        coordinate: {
          lat: 33.6,
          lng: -117.9,
        },
      });
    }
  }
}
