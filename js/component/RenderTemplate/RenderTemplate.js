class RenderTemplate {
    constructor(template, data) {
        this.template = template; //Pasiima html template
        this.data = data; //


        this.DOM = null;
        this.arr = null;
        this.templateValue = {};
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

    isValid() {

    }


    render() {

        this.arr = this.template.match(/{([^}]+)}/g);
        let value = '';
        for(const key in this.arr) {
            let property = this.arr[key].replace(this.regExp.remove, '');
            this.templateValue[property] = property;
            if(parseInt(key) === 0) {
                value += this.arr[key];
            }else {
                value += '|' + this.arr[key];
            }
        }

        const regex = new RegExp(value, 'gi');

        for(const key in this.data ) {
            for(const property in this.templateValue) {
                this.dataValue['{'+ property + '}'] = this.data[key][property]; 
            }
            let replace = this.template.replace(regex, (matched) => {
                return this.dataValue[matched];
            })

            this.DOM = document.querySelector(this.data[key]['selector']);
            this.DOM.insertAdjacentHTML('beforeend', replace);
        }
    }
}
export {RenderTemplate};