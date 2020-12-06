class RenderTemplate {
    constructor(template, data) {
        this.template = template; //Pasiima html template
        this.data = data; //


        this.DOM = null;
        this.arr = null;
        this.dataValue = {};
        this.regExp = {
            find: /{([^}]+)}/g,
            remove: /[\{\}']+/g,  
        }

        this.init() // initialize
    }

    init () {
        this.render();
    }

    error(value) {
        console.error(`ERROR: ${value}`);
    }

    isValidTmpValue(value) {
        if(value === null) {
            this.error('template dont have a value for render');
            return false;
        }

        return true;
    }

    isValidData(data) {
        if(!Array.isArray(data)) {
            this.error('data is not array');
            return false;
        }

        if(data.length === 0) {
            this.error('data is empty');
            return false;
        }

        return true;
    }

    isValidSelector(selector) {
        if(selector === null) {
            this.error('selector does not exist!');
            return false;
        }

        return true;
    }

    get tmpValue() {
        return this.arr = this.template.match(this.regExp.find);
    }

    filterTemplate() {
        let tmpObj = {};
        let regexString = '';
        for(const key in this.tmpValue){
            let property = this.tmpValue[key].replace(this.regExp.remove,'');
            tmpObj[property] = property;
            if(parseInt(key) === 0) {
                regexString += this.tmpValue[key];
            }else {
                regexString += '|' + this.tmpValue[key];
            }
        }

        const obj =  {
            tmp: tmpObj,
            regex: regexString
        };

        return obj;
    }

    render() {
        if(!this.isValidData(this.data)) {
            return false;
        }

        if(!this.isValidTmpValue(this.tmpValue)) {
            return false;
        }

        const tmpObj = this.filterTemplate().tmp;
        const string = this.filterTemplate().regex;
    
        const regex = new RegExp(string, 'gi');
    
        for(const key in this.data ) {
            if(Object.keys(this.data[key]).length === 0) {
               continue;
            }

            for(const property in tmpObj) {
                this.dataValue['{'+ property + '}'] = this.data[key][property]; 
            }

            let replace = this.template.replace(regex, (matched) => this.dataValue[matched]);
            
            this.DOM = document.querySelector(this.data[key]['selector']);

            if(!this.isValidSelector(this.DOM)) {
                return false;
            }

            this.DOM.insertAdjacentHTML('beforeend', replace);
        }

        return true;
    }
}
export {RenderTemplate};