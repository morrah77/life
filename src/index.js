import './styles/style.less';
import {StreamService} from './services/StreamService'

let streamService = new StreamService('.video')
streamService.run()
