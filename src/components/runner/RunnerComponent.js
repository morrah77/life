import {Runner} from "./Runner";
import './style.less'

const CONFIG = {
    width: 600,
    height: 400
}

export class RunnerComponent {
    constructor(selector = '.App', config) {
        this.selector = selector
        this.config = {width: null, height: null, ...CONFIG, ...config}
        this.appDomElement = document.querySelector(selector) || this.initDomElement()
        this.initRender()
        this.isRnning = false
        this.runnerService = new Runner(this.render.bind(this))
        // this.frame = this.runnerService.getFrame()
    }

    initDomElement() {
        let domElement = document.createElement('div')
        domElement.setAttribute(this.selector[0] == '.' ? 'class' : this.selector[0] == '#' ? 'id' : 'name', this.selector.substr(1))
        document.body.appendChild(this.domElement)
        return domElement
    }

    initRender() {
        this.canvas = document.createElement('canvas')
        this.canvas.setAttribute('width', this.config.width)
        this.canvas.setAttribute('height', this.config.height)
        this.appDomElement.appendChild(this.canvas)
        this.context = this.canvas.getContext('2d')

        let controls = document.createElement('div')
        controls.setAttribute('class', 'controls')
        this.appDomElement.appendChild(controls)

        this.startStopButton = document.createElement('button')
        this.startStopButton.innerText = 'Start'
        this.startStopButton.addEventListener('click', this.startStopHandler.bind(this))
        controls.appendChild(this.startStopButton)
    }

    startStopHandler(event) {
        event.stopPropagation()
        if (!this.isRnning) {
            event.target.innerText = 'Stop'
            this.start()
            return
        }
        event.target.innerText = 'Start'
        this.stop()
    }

    controlHandler(event) {
        switch (event.key) {
            case 'w' :
                this.runnerService.controlUp(-10)
                break
            case 's' :
                this.runnerService.controlUp(10)
                break
            case 'd':
                this.runnerService.controlRight(10)
                break
            case 'a':
                this.runnerService.controlRight(-10)
                break
            default:
                break
        }
    }

    start() {
        document.addEventListener('keydown', this.controlHandler.bind(this))
        this.runnerService.run()
        this.isRnning = true
    }

    stop() {
        document.removeEventListener('keydown', this.controlHandler.bind(this))
        this.runnerService.stop()
        this.isRnning = false
    }

    render(frame) {
        this.context.clearRect(0, 0, this.config.width, this.config.height)
        this.context.moveTo(0, frame.ground[0])
        this.context.beginPath()
        for (let i = 0; i < this.config.width; i++) {
            this.context.lineTo(i, frame.ground[i])
        }
        this.context.stroke()
        this.context.moveTo(frame.hero.x, frame.hero.y)
        for (let i = 0; i < frame.hero.view[0].length; i++) {
            for (let j = 0; j < frame.hero.view.length; j++) {
                if (frame.hero.view[i][j] > 0) {
                    this.context.fillStyle = i%2 ? 'red' : 'green'
                    this.context.fillRect(frame.hero.x + i, frame.hero.y + j, 1, 1)
                }
            }
        }
        for (let i = 0; i < frame.objects.length; i++) {
            this.renderObject(frame.objects[i])
        }
    }

    renderObject(object) {
        this.context.moveTo(object.x, object.y)
        this.context.fillStyle = object.color
        this.context.fillRect(object.x, object.y, object.width, object.height)
    }
}