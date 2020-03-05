import { Component, OnInit } from '@angular/core';

import { IODataService } from '@core/services/IOData.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})

export class ExportDataComponent implements OnInit {

  constructor(private ioDataService: IODataService) { }

  ngOnInit() {
  }

  downLoadFile() {
    this.ioDataService.downloadFile().subscribe(
      (data: Blob) => {
        console.log(data);
        const blob = new Blob([data], { type: 'application/octet-stream' });
        saveAs(data, "userTable");
      });
  }

}
