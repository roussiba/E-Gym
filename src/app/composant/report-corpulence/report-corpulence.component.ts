import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
Highcharts.createElement('link', {
  href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
  rel: 'stylesheet',
  type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);
// Add the background image to the container
Highcharts.addEvent(Highcharts.Chart, 'afterGetContainer', function () {
  // eslint-disable-next-line no-invalid-this
  this.container.style.background =
      'url(https://www.highcharts.com/samples/graphics/sand.png)';
});

@Component({
  selector: 'app-report-corpulence',
  templateUrl: './report-corpulence.component.html',
  styleUrls: ['./report-corpulence.component.css']
})
export class ReportCorpulenceComponent implements OnInit {

  highcharts = Highcharts;

  chartOptions = {
    colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
      '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      type: "spline",
      backgroundColor: null,
      style: {
        fontFamily: 'Signika, serif'
      }
    },
    title: {
      style: {
        color: 'black',
        fontSize: '16px',
        fontWeight: 'bold'
      },
      text: "Monthly Average Temperature"
    },
    subtitle: {
      text: "Source: WorldClimate.com"
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    yAxis: {
      title: {
        text: "Temperature °C"
      },
      labels: {
        style: {
          color: '#6e6e70'
        }
      }
    },
    legend: {
      backgroundColor: '#E0E0E8',
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '13px'
      }
    },
    plotOptions: {
      series: {
        shadow: true
      },
      candlestick: {
        lineColor: '#404048'
      },
      map: {
        shadow: false
      }
    },
    tooltip: {
      valueSuffix: " °C"
    },
    series: [
      {
        name: 'Poids',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {
        name: 'Taille',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      },
      {
        name: 'Hanche',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      },
      {
        name: 'Cuisse',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }
    ],
    navigator: {
      xAxis: {
        gridLineColor: '#D0D0D8'
      }
    },
    rangeSelector: {
      buttonTheme: {
        fill: 'white',
        stroke: '#C0C0C8',
        'stroke-width': 1,
        states: {
          select: {
            fill: '#D0D0D8'
          }
        }
      }
    },
    scrollbar: {
      trackBorderColor: '#C0C0C8'
    }
  };
  constructor() { }

  ngOnInit() {
  }
}
