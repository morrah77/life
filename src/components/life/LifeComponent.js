import {Life} from './Life'
import Patterns from "./Patterns";
import './style.less'

export class LifeComponent {
    constructor(selector = '.Life', rowCount = 10, cellCount = 10) {
        this.selector = selector
        this.rowCount = rowCount
        this.cellCount = cellCount

        this.appDomElement = document.querySelector(this.selector)
        if (!this.appDomElement) {
            this.appDomElement = document.createElement('div')
            this.appDomElement.setAttribute('class', 'Life')
            document.body.appendChild(this.appDomElement)
        }
        this.gameDomElement = document.createElement('div');
        this.appDomElement.appendChild(this.gameDomElement);

        this.cells = []
        for (let i = 0; i < rowCount; i++) {
            let row = []
            for (let j = 0; j < cellCount; j++) {
                row.push({
                    x: j,
                    y: i,
                    status: 'dead'
                })
            }
            this.cells.push(row)
        }

        this.lifeService = new Life()
        this.lifeService.setCells(this.cells)
        this.lifeService.setListener(this.render.bind(this))
        this.initRender(this.cells)

        this.startStopDomElement = document.createElement('button');
        this.startStopDomElement.innerText = 'Start'
        this.startStopDomElement.addEventListener('click', this.startStopHandler.bind(this))
        this.appDomElement.appendChild(this.startStopDomElement)

        this.patternElement = document.createElement('button');
        this.patternElement.innerText = 'Pattern'
        this.patternElement.addEventListener('click', this.patternHandler.bind(this))
        this.appDomElement.appendChild(this.patternElement)
    }

    run() {
        this.lifeService.start()
    }

    stop() {
        this.lifeService.stop()
    }

    render() {
        let elm = this.gameDomElement
        for(let i = 0; i < elm.childNodes.length; i++) {
            let row = elm.childNodes[i]
            for(let j = 0; j < row.childNodes.length; j++) {
                let cell = row.childNodes[j]
                if (this.cells[i][j].status === 'alive') {
                    cell.setAttribute('alive', 'true')
                    continue
                }
                cell.setAttribute('alive', 'false')
            }
        }
    }

    seed() {
        let elm = this.gameDomElement
        for(let i = 0; i < elm.childNodes.length; i++) {
            let row = elm.childNodes[i]
            for(let j = 0; j < row.childNodes.length; j++) {
                let cell = row.childNodes[j]
                if (cell.getAttribute('alive') === 'true') {
                    this.cells[i][j].status = 'alive'
                } else {
                    this.cells[i][j].status = 'dead'
                }
                cell.removeEventListener('click', this.cellClickHandler)
            }
        }
    }

    initRender() {
        let element = this.gameDomElement;

        for (let i = 0; i < this.rowCount; i++) {
            let row = document.createElement('div')
            row.setAttribute('class', 'row')
            for (let j = 0; j < this.cellCount; j++) {
                let cell = document.createElement('div')
                cell.setAttribute('class', 'cell')
                cell.setAttribute('alive', 'false')
                cell.addEventListener('click', this.cellClickHandler)
                row.appendChild(cell)
            }
            element.appendChild(row)
        }
    }

    cellClickHandler(event) {
        event.preventDefault()
        let cell = event.target
        if (cell.getAttribute('alive') === 'true') {
            cell.setAttribute('alive', 'false')
        } else {
            cell.setAttribute('alive', 'true')
        }
    }

    startStopHandler(event) {
        if (!this.lifeService.isRunning()) {
            this.seed()
            event.target.innerText = 'Stop'
            this.run()
            return
        }
        this.lifeService.stop()
        let elm = this.gameDomElement
        for(let i = 0; i < elm.childNodes.length; i++) {
            let row = elm.childNodes[i]
            for(let j = 0; j < row.childNodes.length; j++) {
                let cell = row.childNodes[j]
                cell.addEventListener('click', this.cellClickHandler)
            }
        }
        event.target.innerText = 'Start'
    }

    displayError(message) {
        console.log(message)
    }

    patternHandler(event) {
        if (this.lifeService.isRunning()) {
            return
        }
        let pattern = Patterns.pulsar()
        if(pattern.length > this.rowCount || pattern[0].length > this.cellCount) {
            this.displayError ('Could not apply pattern')
            return
        }
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[0].length; j++) {
                this.gameDomElement.childNodes[i].childNodes[j].setAttribute('alive', pattern[i][j] ? true : 'false')
            }
        }
    }
}