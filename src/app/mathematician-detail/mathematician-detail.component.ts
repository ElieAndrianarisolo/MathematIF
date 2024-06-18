import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MathematicianDetail } from '../mathematician-detail';
import { MathematicianDetailService } from '../mathematician-detail.service';
import { forkJoin } from 'rxjs';


@Component({
selector: 'app-matematician-detail',
templateUrl: './mathematician-detail.component.html',
styleUrls: ['./mathematician-detail.component.css']
})
export class MathematicianDetailComponent implements OnInit {
	@Input() mathematician?: MathematicianDetail;
  isLoading: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private mathematicianDetailService: MathematicianDetailService
	) {}

	ngOnInit(): void {
    this.route.params.subscribe( params =>
    {
      this.getMathematician();
      // your code continues here
    });
	}



	getMathematician() {
		const name = this.route.snapshot.paramMap.get('value');
		if (name != null) {
      this.isLoading = true;
			forkJoin([this.mathematicianDetailService.getMathematicianPart1(name), this.mathematicianDetailService.getMathematicianPart2(name)]).subscribe(
				(value: any)=>{
          this.isLoading = false;
          value[1].works = value[1].works[0].split(' | ');
					this.mathematician = {...value[0],...value[1]};
			});
		}
	}
}




