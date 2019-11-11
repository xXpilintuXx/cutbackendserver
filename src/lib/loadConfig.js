const fs = require('fs');
const path = require('path');
const jsonFile = path.join(__dirname, '..', 'config', 'developers.json')

class Configurator {
    constructor(){

        this.loadDevelopers = () => {
            let rawdata = fs.readFileSync(jsonFile);
            let developers = JSON.parse(rawdata);
            return developers
        }



    }
}


module.exports = Configurator
