// Widget di accessibilita, v1.0.0 PHI Informatica SRL
const textAligns = [ 'left', 'center', 'right', 'justify' ];
const textAlignLabels = [ 'sinistra', 'centro', 'destra', 'giustificato' ];

const textSpacing = [ /* 'small', */ 'medium', 'big', 'huge' ].reverse();
const textSpacingLabels = [ /* 'piccola', */ 'normale', 'grande', 'gigante' ].reverse();

window.accessibilityTextToSpeech = text => {
    if('speechSynthesis' in window){
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
    else
        console.error("La funzione di riproduzione vocale non è disponibile nel tuo browser");
}

window.Widget = class{
    #container;
    #icon;
    #currentTextAlignIndex = -1;
    #currentTextSpacing = -1;
    #tts = false;

    constructor(widgetOptions = {}){
        this.setWidgetOptions(widgetOptions);

        document.body.addEventListener('click', ({ target }) => {
            if(!this.#tts || target.closest('widget-container'))
                return;

            const text = target.outerText;
            window.accessibilityTextToSpeech(text);

            document.querySelectorAll('[accessibility-tts]').forEach(i => i.removeAttribute('accessibility-tts'));
            target.setAttribute('accessibility-tts', true);
        });
    }

    get container(){
        if(!this.#container)
            this.render();
        return this.#container;
    }

    get icon(){
        return this.#icon;
    }

    set icon(value){
        this.#icon = value;
        this.container.querySelector('widget-icon ion-icon').setAttribute('name', value);
    }

    setWidgetOptions(value){
        const widgetOptions = value;
        if(typeof widgetOptions !== 'object' || Array.isArray(widgetOptions) || !widgetOptions)
            throw new Error("widgetOptions is not a valid Object in new Widget(widgetOptions?)");
        this.render();
        this.icon = widgetOptions.icon || 'accessibility-outline';

        for(const variable in widgetOptions.style?.variables)
            this.#container.style.setProperty('--' + variable, widgetOptions.style?.variables[variable]);
    }

    render(){
        this.#container = document.createElement('widget-container');
        const icon = document.createElement('widget-icon');
        icon.innerHTML = `<ion-icon name="${this.icon}"></ion-icon>`;
        this.#container.appendChild(icon);

        icon.addEventListener('click', () => this.#container.popup.classList.toggle('open'));

        this.#container.popup = document.createElement('widget-popup');
        // Crea il container principale
        const grid = document.createElement('widget-buttons-grid');

        // ** Prima riga dei pulsanti **
        const row1 = document.createElement('widget-buttons-row');

        // Pulsante 1: Contrasto del sito
        const button1 = document.createElement('widget-button');
        const icon1 = document.createElement('ion-icon');
        icon1.setAttribute('name', 'contrast-outline');
        const value1 = document.createElement('widget-value');
        value1.textContent = 'normale';
        const label1 = document.createElement('span');
        label1.textContent = 'Contrasto del sito';
        button1.setValue = v => value1.textContent = v;
        button1.append(icon1, value1, label1);
        row1.appendChild(button1);

        button1.addEventListener('click', function(){
            this.classList.toggle('toggled');
            this.toggled = this.classList.value.includes('toggled');
            this.setValue(this.toggled ? 'elevato' : 'normale');
            document.body[this.toggled ? 'setAttribute' : 'removeAttribute']('accessibility-contrast', true);
        });

        // Pulsante 2: Testo grande
        const button2 = document.createElement('widget-button');
        const icon2 = document.createElement('ion-icon');
        icon2.setAttribute('name', 'text-outline');
        const value2 = document.createElement('widget-value');
        value2.textContent = 'OFF';
        const label2 = document.createElement('span');
        label2.textContent = 'Testo grande';
        button2.setValue = v => value2.textContent = v;
        button2.append(icon2, value2, label2);
        row1.appendChild(button2);

        button2.addEventListener('click', function(){
            button2.classList.toggle('toggled')
            const toggled = button2.classList.value.includes('toggled');
            
            value2.textContent = toggled ? 'ON' : 'OFF';
            document.body[toggled ? 'setAttribute' : 'removeAttribute']('accessibility-big-text', true);
        });


        // Pulsante 3: Font dislessia
        const button3 = document.createElement('widget-button');
        const icon3 = document.createElement('ion-icon');
        icon3.setAttribute('name', 'diamond-outline');
        const value3 = document.createElement('widget-value');
        value3.textContent = 'OFF';
        const label3 = document.createElement('span');
        label3.textContent = 'Font dislessia';
        button3.setValue = v => value3.textContent = v;
        button3.append(icon3, value3, label3);
        row1.appendChild(button3);

        button3.addEventListener('click', function(){
            button3.classList.toggle('toggled')
            const toggled = button3.classList.value.includes('toggled');
            
            value3.textContent = toggled ? 'ON' : 'OFF';
            document.body[toggled ? 'setAttribute' : 'removeAttribute']('accessibility-dyslexia', true);
        });

        // Aggiungi la riga alla grid
        grid.appendChild(row1);

        // ** Seconda riga dei pulsanti **
        const row2 = document.createElement('widget-buttons-row');

        // Pulsante 4: Leggi testo cliccato
        const button4 = document.createElement('widget-button');
        const icon4 = document.createElement('ion-icon');
        icon4.setAttribute('name', 'volume-high-outline');
        const value4 = document.createElement('widget-value');
        value4.textContent = 'OFF';
        const label4 = document.createElement('span');
        label4.textContent = 'Leggi testo cliccato';
        button4.setValue = v => value4.textContent = v;
        button4.append(icon4, value4, label4);
        row2.appendChild(button4);

        button4.addEventListener('click', () => {
            button4.classList.toggle('toggled');
            this.#tts = !this.#tts;
            if(this.#tts)
                window.accessibilityTextToSpeech("Funzione di lettura del testo attivata");
            else
                document.querySelectorAll('[accessibility-tts]').forEach(i => i.removeAttribute('accessibility-tts'));
        });

        // Pulsante 5: Metti in risalto i link
        const button5 = document.createElement('widget-button');
        const icon5 = document.createElement('ion-icon');
        icon5.setAttribute('name', 'link-outline');
        const value5 = document.createElement('widget-value');
        value5.textContent = 'OFF';
        const label5 = document.createElement('span');
        label5.textContent = 'Metti in risalto i link';
        button5.setValue = v => value5.textContent = v;
        button5.append(icon5, value5, label5);
        row2.appendChild(button5);
        
        button5.addEventListener('click', function(){
            button5.classList.toggle('toggled')
            const toggled = button5.classList.value.includes('toggled');
            
            value5.textContent = toggled ? 'ON' : 'OFF';
            document.body[toggled ? 'setAttribute' : 'removeAttribute']('accessibility-links', true);
        });

        // Pulsante 6: Disabilita animazioni e transizioni
        const button6 = document.createElement('widget-button');
        const icon6 = document.createElement('ion-icon');
        icon6.setAttribute('name', 'aperture-outline');
        
        const value6 = document.createElement('widget-value');
        value6.textContent = 'NO';
        const label6 = document.createElement('span');
        label6.textContent = 'Disabilita animazioni e transizioni';
        button6.setValue = v => value6.textContent = v;
        button6.append(icon6, value6, label6);
        row2.appendChild(button6);

        button6.addEventListener('click', function(){
            button6.classList.toggle('toggled')
            const toggled = button6.classList.value.includes('toggled');
            
            value6.textContent = toggled ? 'Sì' : 'No';
            document.body[toggled ? 'setAttribute' : 'removeAttribute']('accessibility-no-animations', true);
        });


        // Aggiungi la riga alla grid
        grid.appendChild(row2);

        // ** Terza riga dei pulsanti **
        const row3 = document.createElement('widget-buttons-row');

        // Pulsante 7: Spaziatura testo
        const button7 = document.createElement('widget-button');
        const icon7 = document.createElement('ion-icon');
        icon7.setAttribute('name', 'filter-outline');
        const value7 = document.createElement('widget-value');
        value7.textContent = 'DEFAULT';
        const label7 = document.createElement('span');
        label7.textContent = 'Spaziatura testo';
        button7.setValue = v => value7.textContent = v;
        button7.append(icon7, value7, label7);
        row3.appendChild(button7);

        button7.addEventListener('click', () => {
            const textSpacingIndex = this.#currentTextSpacing += 1;
            const newSpacing = textSpacing[textSpacingIndex];
            value7.textContent = textSpacingLabels[textSpacingIndex] || 'default';
            button7.classList[newSpacing ? 'add' : 'remove']('toggled');
            if(!newSpacing){
                document.body.removeAttribute('accessibility-text-spacing');
                this.#currentTextSpacing = -1;
            }
            else
                document.body.setAttribute('accessibility-text-spacing', newSpacing);
        });

        // Pulsante 8: Allineamento testo
        const button8 = document.createElement('widget-button');
        const icon8 = document.createElement('ion-icon');
        icon8.setAttribute('name', 'menu-outline');
        const value8 = document.createElement('widget-value');
        value8.textContent = 'DEFAULT';
        const label8 = document.createElement('span');
        label8.textContent = 'Allineamento testo';
        button8.setValue = v => value8.textContent = v;
        button8.append(icon8, value8, label8);
        row3.appendChild(button8);

        button8.addEventListener('click', () => {
            const newAlignIndex = this.#currentTextAlignIndex += 1;
            const newAlign = textAligns[newAlignIndex];
            value8.textContent = textAlignLabels[newAlignIndex] || 'default';
            
            button8.classList[newAlign ? 'add' : 'remove']('toggled');
            if(!newAlign){
                document.body.removeAttribute('accessibility-text-align');
                this.#currentTextAlignIndex = -1;
            }
            else
                document.body.setAttribute('accessibility-text-align', newAlign);
        });

        // Aggiungi la riga alla grid
        grid.appendChild(row3);

        // infine monta nella finestra del tuo widget
        this.#container.popup.appendChild(grid);


        this.#container.appendChild(this.#container.popup);
    }

    show(){
        document.body.appendChild(this.#container);
    }
}

window.Accessibility = class{
    #widget;

    constructor(widget){
        if(widget instanceof window.Widget)
            this.widget = widget;
        else
            this.widget = new window.Widget(widget);
    }

    set widget(value){
        if(value instanceof window.Widget)
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
