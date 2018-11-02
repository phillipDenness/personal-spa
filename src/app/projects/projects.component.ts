import { Component, OnInit } from '@angular/core';
import { AnnotationSet } from '../annotation-ui-lib/data/annotation-set.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  annotationSet: AnnotationSet;
  url: string;
  cvDownloadUrl: string;

  constructor(private actr: ActivatedRoute) {
    this.actr.data.subscribe(data => {
      this.url = data.items;
      this.annotationSet = new AnnotationSet('', null, null, null, null, null, []);
    });
  }

  ngOnInit() {
  }
}
