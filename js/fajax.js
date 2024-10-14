class Fajax {
    constructor() {
        this._onload = '';
        this._responseText = '';
        this._status = 0;
    }

    //getters and setters

    set status(s) {
        this._status = s;
    }

    set responseText(r) {
        this._responseText = r;
    }

    set onload(o) {
        this._onload = o;
    }

    get method() {
        return this._method;
    }

    get url() {
        return this._url;
    }

    get data() {
        return this._data;
    }

    get onload() {
        return this._onload;
    }

    get status() {
        return this._status;
    }

    get responseText() {
        return this._responseText;
    }

    //other methods
    open(method, url, data = '') {
        this._method = method;
        this._url = url;
        this._data = data;
    }

    send() {
        let message = new Message(this.method, this.url, this.data);
        let returnedMessage = server(message);

        //put response and status in fajax object
        this.responseText = returnedMessage.responseText;
        this.status = returnedMessage.status;

        //call onload function 
        this.onload();
    }
}