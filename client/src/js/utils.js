class Utils {
    constructor() {
    }

    // elementsFromPoint polyfill
    elementsFromPoint(x,y) {
        var parents = [];
        var parent = void 0;
        do {
            if (parent !== document.elementFromPoint(x, y)) {
                parent = document.elementFromPoint(x, y);
                parents.push(parent);
                parent.style.pointerEvents = 'none';
            } else {
                parent = false;
            }
        } while (parent);
        parents.forEach(function (parent) {
            return parent.style.pointerEvents = 'all';
        });
        return parents;
    }
}
const utils = new Utils()
export default utils