// Angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'kt-working-hour',
	templateUrl: './working-hour.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrokingHourComponent implements OnInit {
	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 * @param router: Router
	 */
	constructor() {}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {}
}
