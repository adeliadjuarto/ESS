
import { BaseModel } from './../../../core/base.model';

export class Payroll extends BaseModel {
    public payrollStatus: string;
    public monthName: string;
    public payrollFile: File;
}
