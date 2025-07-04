import Accessibility from './inc/Accessibility.js';
setTimeout(() => console.clear(), 500);

const accessibility = new window.Accessibility({
    style: {
        variables: {
            iconSize: '3em',
            
            widgetWidth: '30em',
            widgetSpacing: '2em',
            widgetPadding: '1em',
            widgetTextColor: '#000',
            widgetColor: '#000',
            widgetIconColor: '#fff',
            widgetBackgroundColor: '#fff'/* '#eee' */,
            widgetIconBackgroundColor: '#0066ff',
            widgetBorder: '0'/* '2px solid #aaa' */,
            widgetShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',

            widgetButtonsSpacing: '.5em .5em',
            widgetButtonIconSize: '2em',
            widgetButtonsBorder: '1px solid transparent'/* '1px solid #aaa' */,
            widgetButtonsBackgroundColor: '#fff',
            widgetButtonsTextColor: '#000',
            widgetButtonsFontWeight: '500',

            widgetButtonsToggledBackgroundColor: '#fff',
            widgetButtonsToggledTextColor: '#0066ff',
            widgetButtonsToggledBorder: '2px solid #0066ff',
            widgetButtonsToggledFontWeight: '700',
            widgetButtonsShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',

            widgetHeaderColor: '#0066ff',
            widgetHeaderTextColor: '#fff'
        }
    }
});

accessibility.widget.show();

window.accessibility = accessibility