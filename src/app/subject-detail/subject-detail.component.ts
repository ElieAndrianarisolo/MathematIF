import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectDetail } from '../subject-detail';
import { SubjectDetailService } from '../subject-detail.service';


@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit{
  subject?: SubjectDetail;
  isLoading: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private subjectDetailService: SubjectDetailService
	) {}

	ngOnInit(): void {
    this.route.params.subscribe( params =>
    {
      this.getSubject();
    });
	}

	getSubject() {
		const name = this.route.snapshot.paramMap.get('value');
		if (name != null) {
    	this.isLoading = true;
		this.subjectDetailService.getSubject(name).subscribe((value)=>{
			this.isLoading = false;
      let index = value.findIndex((v: any) => v.value === name);
      if (index != -1) {
        this.subject = value[index];
      }else {
        this.subject = value[0];
      }
		});
		}
	}

  protected readonly JSON = JSON;
}




