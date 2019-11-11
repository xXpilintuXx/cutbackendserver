const striptags = require('striptags');
const convert = require('html-to-json-data');
const { text } = require('html-to-json-data/definitions');


class cleaner {
    constructor(){

        this.cleanThis = (html) => {
            let data = striptags(html, [], []); 
            data = data.replace(/\r|\n/g, " ");
            data = data.replace(/&nbsp;|&quot;/g, "  ");
            data = data.replace('                  ', '","');
            data = data.replace('            ', '');
            data = this.deleteDescription(data);
            // data = this.formatIntoJson(data);
            // console.log(data)
            return data;
        }

        this.deleteDescription = (text) => {
            text = text.replace('Descripción: ', '');
            return text;
        }

        this.cleanData = (data) => {
            let str = data.split(':');
            str.splice(0, 1, '');
            str = str.join();
            str = str.split('');
            str.splice(1, 1, '');
            str = str.join();
            str = str.replace(/,/g, '');
            return str
        }

        this.htmlToJson = (html) => {
            const json = convert(html, {
                descripcion: text('.field-name-field-descripcion-evento'),
                tipo: text('.field-name-field-tipo-de-evento'),
                tema: text('.field-name-field-tema-del-evento'),
                lugar: text('.field-name-field-lugar-even'),
                fecha: text('.field-name-field-fecha-event')
            })
            json.descripcion = this.cleanThis(json.descripcion);
            json.tipo = this.cleanData(json.tipo);
            json.tema = this.cleanData(json.tema);
            json.lugar = this.cleanData(json.lugar);
            json.fecha = this.cleanData(json.fecha);
            return json;
        }

        // this.formatIntoJson = (html) => {
        //     let data = '{ "titulo":'+html;
        //     data = data.replace(/Descripción:/g, 'Descripción":')
        //     data = data.replace(/Tipo de Evento:/g, '","Tipo de Evento":"')
        //     data = data.replace(/":/g, '":"');
        //     data = data.replace(/\r\n/g, '"');
        //     data = data+'"}';
        //     //data = this.parseJson(data);
        //     return data
        // }
    }
}

module.exports = cleaner