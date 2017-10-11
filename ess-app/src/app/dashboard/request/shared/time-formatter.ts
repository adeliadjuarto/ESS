import { NouiFormatter } from 'ng2-nouislider';

export class TimeFormatter implements NouiFormatter {
  to(value: number): string {
    let h = Math.floor(value / 3600);
    let m = Math.floor(value % 3600 / 60);
    let values = [h, m];
    let timeString: string = '';
    values.forEach((_, i) => {
      if (values[i] < 10) {
        timeString += '0';
      }
      timeString += values[i].toFixed(0);
      if (i < 1) {
        timeString += ':';
      }
    });
    return timeString;
  };

  from(value: string): number {
    let v = value.split(':').map(parseInt);
    let time: number = 0;
    time += v[0] * 3600;
    time += v[1] * 60;
    return time;
  }
}
