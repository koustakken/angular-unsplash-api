import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Photo } from '../../types/photo.interface';

@Component({
	selector: 'app-photo-grid',
	templateUrl: './photo-grid.component.html',
	styleUrls: ['./photo-grid.component.scss']
})
export class PhotoGridComponent implements OnInit {

	photos: Photo[] = [];

	constructor(private http: HttpClient) { }

	ngOnInit(): void {
		this.loadPhotos();
	}

	loadPhotos() {
		// Выполнение GET-запроса к API Unsplash для получения списка фотографий
		this.http.get<any[]>('https://api.unsplash.com/photos', {
			headers: {
				Authorization: 'Client-ID -dO2cvVnUsNoRYTC0Q3LQyCpjhm6kMbM6U8N-TOrtMc'
			}
		}).subscribe(photos => {
			// Обработка полученных данных и сохранение фотографий в массиве
			this.photos = photos.map(photo => ({
				id: photo.id,
				url: photo.urls.regular,
				author: photo.user.name,
				description: photo.description
			}));
		});
	}
}
