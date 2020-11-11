import {Checkers} from './Checkers'
import './style.less'

export class CheckersComponent {
    constructor(selector) {
        this.selector = selector
        this.appDomElement = document.querySelector(selector)
        this.checkersService = new Checkers()
        this.initRender()
    }

    initRender() {
        this.boardDomElement = document.createElement('div')
        this.boardDomElement.setAttribute('class', 'board')
        this.appDomElement.appendChild(this.boardDomElement)
        for (let i = 0; i < Object.keys(this.checkersService.positions).length; i++) {
            for (let j = 0; j < this.checkersService.positions[Object.keys(this.checkersService.positions)[i]].length; j++) {
                let cell = document.createElement('div')
                cell.setAttribute('class', 'cell ' + this.checkersService.positions[Object.keys(this.checkersService.positions)[i]][j].color + (this.checkersService.positions[Object.keys(this.checkersService.positions)[i]][j].checker ? ' checked' : '') + (this.checkersService.positions[Object.keys(this.checkersService.positions)[i]][j].checker ? ' checked-' + this.checkersService.positions[Object.keys(this.checkersService.positions)[i]][j].checker.color : ''))
                this.boardDomElement.appendChild(cell)
            }
        }
    }
}