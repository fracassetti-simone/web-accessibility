import Widget from './Widget.js';

class Accessibility{
    #widget;

    constructor(widget){
        if(widget instanceof Widget)
            this.widget = widget;
        else
            this.widget = new Widget(widget);
    }

    set widget(value){
        if(value instanceof Widget)
            return this.#widget = value;
        throw new Error("Error setting Accessibility.widget, value is not an instance of Widget");
    }

    get widget(){
        return this.#widget;
    }

    static parseColor(rgb){
        rgb = rgb.substring(4, rgb.length - 1);
        return rgb.split(', ').map(i => Number(i));
    }

    static invertColor(rgb){
        if(typeof rgb === 'string')
            rgb = Accessibility.parseColor(rgb);
        return rgb.map(i => 255 - i);
    }
}

export default Accessibility;

window.Accessibility = Accessibility