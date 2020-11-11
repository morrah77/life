export class PeerConnectionService {
    constructor() {
        this.configuration = {
            iceServers: ['turn:172.17.0.3:90999'],
            peerIdentity: '12345'
        }
    }
    getPeerConnection(configuration) {
        return new RTCPeerConnection(getConfiguration(configuration))
    }
    getConfiguration(configuration) {
        return {...this.configuration, ...configuration}
    }
}