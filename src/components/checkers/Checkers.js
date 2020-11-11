const LETTER_COORDINATES='abcdefg'

export class Checkers {
    constructor() {
        this.positions = this.initPositions()
        this.checkers = this.initCheckers()
    }

    initPositions() {
        let positions = {}
        for (let i = 0; i < 8; i++) {
            positions[LETTER_COORDINATES[i]] = []
            for (let j = 1; j <= 8; j++) {
                positions[LETTER_COORDINATES[i]].push({
                    position: LETTER_COORDINATES[i] + j,
                    color: ((i+j-1)%2) ? 'black' : 'white',
                    checker: null
                })
            }
        }
        return positions
    }

    initCheckers() {
        let checkers = {
            white: this.initCheckersOfColor('white'),
            black: this.initCheckersOfColor('black')
        }
        return checkers
    }

    initCheckersOfColor(color) {
        let checkers = []
        for (let i = 0; i < 16; i++) {
            let positionKeyLetter = (i > 7 ? LETTER_COORDINATES[(i%8)%2 + 1] : LETTER_COORDINATES[(i%8)%2])
            let positionKeyNumber = (color === 'white' ? (i <= 7 ? 1 : 2) : (i <= 7 ? 7 : 8))
            let positionKey = positionKeyLetter + positionKeyNumber
            let checker = {
                color,
                positionKey,
                position: this.positions[positionKeyLetter][positionKeyNumber]
            }
            checkers.push(checker)
            this.positions[positionKeyLetter][positionKeyNumber - 1].checker = checker
        }
        return checkers
    }

    canMove(checker, position) {
        return true
    }

    handleMove(checker, position) {
        if(canMove(checker, position)) {
            checker.position = position
        }
    }
}