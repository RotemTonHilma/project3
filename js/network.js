class Message {
    constructor(method, url, data = '') {
        this._url = url;
        this._method = method;
        this._data = data;
        this._responseText = '';
        this._status = 0;
    }

    set status(s) {
        (s === 200 || s === 400) ? this._status = s : alert("invalid status number");
    }

    set responseText(r) {
        this._responseText = r;
    }

    set url(u) {
        this._url = u;
    }

    set method(m) {
        this._method = m;
    }

    set data(d) {
        this._data = d;
    }

    get status() {
        return this._status;
    }

    get responseText() {
        return this._responseText;
    }

    get url() {
        return this._url;
    }

    get method() {
        return this._method;
    }

    get data() {
        return this._data;
    }
}