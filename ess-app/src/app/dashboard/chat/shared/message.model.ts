export class Message {

    public text: string[];
    public sender: string;
    public buttons: any[];

    constructor() {
        this.text = null;
        this.sender = null;
        this.buttons = [];
    }


}
