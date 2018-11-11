const matrix = [
    [0, null, null, null, null],
    [0, 1, 1, 1, 1],
    [null, null, null, null, 1],
    [null, 0, 1, 0, 0],
    [1, 0, null, null, null],
    [1, null, null, null, null],
    [0, null, null, null, null],
    [0, 1, 0, 0, 1],
]
// [1, 0, 0, 0, 0]
// [1, 1, 1, 1, 1]
// [0, 0, 0, 0, 1]
// [0, 1, 1, 1, 1]
// [1, 1, 0, 0, 0]
// [1, 0, 0, 0, 0]
// [1, 0, 0, 0, 0]
// [1, 1, 1, 1, 1]

const monopolyMap = genMonopolyMap(matrix);

function genMonopolyMap (matrix) {
    const result = {};

    let inLoop = true;
    let keyIndex = 0;
    let rowIndex = 0;
    let colIndex = matrix[rowIndex].findIndex(isRoad);

    while(inLoop) {
        // set current item
        result[keyIndex] = {
            value: [rowIndex, colIndex],
            nextValue: null,
            prevValue: keyIndex ? result[keyIndex - 1].value : null,
            towardsTo: 'down'
        };

        // set previous item
        if (keyIndex) {
            result[keyIndex - 1].nextValue = result[keyIndex].value;

            const deltaX = result[keyIndex - 1].nextValue[1] - result[keyIndex - 1].value[1];
            const deltaY = result[keyIndex - 1].nextValue[0] - result[keyIndex - 1].value[0];

            if (deltaX) {
                result[keyIndex - 1].towardsTo = deltaX > 0 ? 'right' : 'left'
            } else if (deltaY) {
                result[keyIndex - 1].towardsTo = deltaY > 0 ? 'down' : 'up'
            }
        }

        keyIndex += 1;

        // try to find next position, priority: right, down, left, up
        if (matrix[rowIndex] && isRoad(matrix[rowIndex][colIndex + 1]) && !inMap(result, rowIndex, colIndex + 1)) {
            colIndex += 1;
        } else if (matrix[rowIndex + 1] && isRoad(matrix[rowIndex + 1][colIndex]) && !inMap(result, rowIndex + 1, colIndex)) {
            rowIndex += 1;
        } else if (matrix[rowIndex] && isRoad(matrix[rowIndex][colIndex - 1]) && !inMap(result, rowIndex, colIndex - 1)) {
            colIndex -= 1;
        } else if (matrix[rowIndex - 1] && isRoad(matrix[rowIndex - 1][colIndex]) && !inMap(result, rowIndex - 1, colIndex)) {
            rowIndex -= 1;
        } else {
            inLoop = false;
        }
    }

    return result;
}

function isRoad (value) {
    return typeof value === 'number';
}

function inMap (res, rowIndex, colIndex) {
    return Object.keys(res).find(v =>
        res[v].value.toString() === `${rowIndex},${colIndex}`
    )
}