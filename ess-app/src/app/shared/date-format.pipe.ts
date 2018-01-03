import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        if (value) {
            let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            if (new Date(value).toString() === 'Invalid Date') {
                return value;
            }
            return new Date(value).toLocaleDateString('id-ID', dateOptions);
        }
    }
}
