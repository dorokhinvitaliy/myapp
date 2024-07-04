export function parseClass(cls) {
    var result = "";
    for (var i = 0; i < cls.length; i += 1) {
        if (Array.isArray(cls[i])) {
            if (cls[i][1]) {
                result += cls[i][0] + " ";
            }
        } else {
            result += cls[i] + " ";
        }
    }
    return result;
}