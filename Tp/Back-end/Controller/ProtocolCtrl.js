/**
 * Permet de split le message d'entrée du socket et struturé les informations
 */
class ProtocolCtrl {

    constructor() {
        this.idConference = null;
        this.message = null;
    }

    getIdConference() {
        return this.idConference;
    }

    getMessage() {
        return this.message;
    }

    setInformations(bufferStr) {
       let idConf = bufferStr.split(' ')[0];
       let message = bufferStr.replace(idConf+" ", '');
       this.idConference = idConf;
       this.message = message;
    }
}

module.exports = ProtocolCtrl;