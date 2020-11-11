export class Runner {
    constructor(callback, options) {
        this.callback = callback
        this.options = {
            width: 600,
            height: 400,
            framePeriod: 1000/15,
            ...options
        }
        this.ground = this.generateGround()
        this.hero = this.generateHero()
        this.objects = this.generateObjects()
        this.control = {
            up: 0,
            right: 0
        }
        this.frame = {
            ground: this.ground,
            hero: this.hero,
            objects: this.objects
        }
        this.updateFrame()
        this.interval = null
    }

    run() {
        this.interval = setInterval(this.updateFrame.bind(this), this.options.framePeriod)
    }

    stop() {
        clearInterval(this.interval)
        this.interval = null
    }

    getFrame() {
        return this.frame
    }

    controlUp(count) {
        this.control.up += count
    }

    controlRight(count) {
        this.control.right += count
    }

    updateFrame() {
        this.calculateObjectsPositions()
        if (this.hero.y + this.hero.view.length >= this.ground[this.hero.x]) {
            this.hero.y -= 1 + this.control.up
            this.hero.x += this.control.right + 1
            this.control.up = 0
            this.control.right = 0
            return
        }
        this.hero.y += 1 + this.control.up
        this.hero.x += this.control.right + 1
        this.callback(this.frame)
        this.control.up = 0
        this.control.right = 0
    }

    calculateObjectsPositions() {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].x = Math.max(this.objects[i].x + this.objects[i].v, 0)
        }
    }

    generateGround() {
        let ground = []
        let seaLevel = this.options.height - Math.random() * this.options.height / 3
        let prevPointLevel = seaLevel
        let coefficient = 0
        for (let i = 0; i < this.options.width; i++) {
            if (i%10 == 0) {
                coefficient = Math.round(Math.random() * 20) - 10
            }
            let level = prevPointLevel + coefficient / 10
            ground.push(level)
            prevPointLevel = level

        }
        return ground
    }

    generateHero() {
        return {
            x: 0,
            y: 0,
            view: [
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
                [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
                [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
            ],
            vx: 1,
            vy: 1
        }
    }

    generateObjects() {
        let objects = []
        let count = Math.max(Math.ceil(Math.random() * 10), 1)
        for (let i = 0; i < count; i++) {
            let object = {
                x: Math.floor(Math.random() * this.options.width),
                y: Math.floor(Math.random() * this.options.height),
                v: Math.floor(Math.random() * -1 / this.options.framePeriod),
                color: i%2 ? 'red' : 'green',
                width: Math.max(Math.floor(Math.random() * 20), 3),
                height: Math.max(Math.floor(Math.random() * 20), 3)
            }
            objects.push(object)
        }
        return objects
    }
}