import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'kt-permit-conflict-simops',
  templateUrl: './permit-conflict-simops.component.html',
  styleUrls: ['./permit-conflict-simops.component.scss']
})
export class PermitConflictSimopsComponent implements OnInit {
@ViewChild('Form') Form:NgForm
  constructor() { }

  ngOnInit() {
  }
 
  resetPreview(e: Event): void {
		e.preventDefault();
		//this.layoutConfigService.resetConfig();
		location.reload();
  }
  
  /**
	 * Submit preview
	 *
	 * @param e: Event
	 */
	submitPreview(e: Event): void {
		//this.layoutConfigService.setConfig(this.model, true);
		location.reload();
	}

}
