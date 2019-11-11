const fs = require('fs');

class Configurator {
    constructor(){

        this.loadDevelopers = () => {
            let rawdata = fs.readFileSync('/config/developers.json');
            let developers = JSON.parse(rawdata);
            return developers
        }



    }
}


module.exports = Configurator
