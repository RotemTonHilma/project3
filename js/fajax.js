class Fajax {
    constructor() {
        this._onload = '';
        this._responseText = '';
        this._status = 0;
    }

    //getters and setters

    set status(s) {
        (s === 200 || s === 400) ? this._status = s : alert("invalid status number");
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
        return this._response;
    }

    //other methods
    open(method, url, data = '') {
        this._method = method;
        this._url = url;
        this._data = data;
    }

    send() {
        let message = new Message(this.method, this.url, this.data);
        server(message);
    }
}