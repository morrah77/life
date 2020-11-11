export class Life {
    constructor() {
        this.cells = []
        this.rules = [
            {
                neighbourCountRule: (n) => (n <= 1),
                currentState: ['dead', 'alive'],
                nextState: ['dead']
            },
            {
                neighbourCountRule: (n) => ((n >= 2) && (n <= 3)),
                currentState: ['alive'],
                nextState: ['alive']
            },
            {
                neighbourCountRule: (n) => (n == 3),
                currentState: ['dead', 'alive'],
                nextState: ['alive']
            },
            {
                neighbourCountRule: (n) => (n >= 4),
                currentState: ['dead', 'alive'],
                nextState: ['dead']
            }
        ]
        this.compiledRules = {
            a0: 'dead',
            a2: 'alive',
            a3: 'alive',
            a4: 'dead',
            d0: 'dead',
            d2: 'dead',
            d3: 'alive',
            d4: 'dead'
        }
        this.generationPeriod = 500
        this.interval = null
        this.stepCount = 0;
        this.listener = () => {}
    }

    setCells(cells) {
        this.cells = cells
    }

    setListener(listener) {
        this.listener = listener
    }

    isRunning() {
        return !!this.interval
    }

    countNeighbours(x, y) {
        let n = 0;
        for(let i = Math.max(y - 1, 0); i <= Math.min(y + 1, this.cells.length - 1); i++) {
            for(let j = Math.max(x - 1, 0); j <= Math.min(x + 1, this.cells[0].length - 1); j++) {
                if (!(j === x && i === y) && this.cells[i][j].status === 'alive') {
                    n++
                }
            }
        }
        switch (n) {
            case 0:
            case 1:
                n = 0
                break
            case 2:
                break
            case 3:
                break
            case 4:
                break
            default:
                n = 4
        }
        return n
    }

    nextGeneration() {
        let nextGeneration = []
        for(let i = 0; i < this.cells.length; i++) {
            let row = this.cells[i]
            let nextRow = []
            for(let j = 0; j < row.length; j++) {
                let cell = row[j]
                let status = this.compiledRules[cell.status[0] + this.countNeighbours(j, i)]
                nextRow.push({
                    x: i,
                    y: j,
                    status
                })
            }
            nextGeneration.push(nextRow)
        }
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = nextGeneration[i]
        }
        this.listener(this.cells)
        this.stepCount++
    }

    start() {
        this.interval = setInterval(
            this.nextGeneration.bind(this),
            this.generationPeriod
        )
    }

    stop() {
        clearInterval(this.interval)
        this.interval = null
    }
}