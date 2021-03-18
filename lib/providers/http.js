"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._onRequestWithOptions = exports.getPathMatches = exports.onRequest = void 0;
var _a = require('path-to-regexp'), pathToRegexp = _a.pathToRegexp, parse = _a.parse;
/**
 * Handle HTTP requests.
 * @param handler A function that takes a request and response object,
 * same signature as an Express app.
 */
function onRequest(handler) {
    return _onRequestWithOptions(handler);
}
exports.onRequest = onRequest;
function getPathMatches(pathPattern, _a) {
    var path = _a.path;
    var pathNodeList = parse(pathPattern);
    var regexpNodeList = pathToRegexp(pathPattern).exec(path);
    var matches = {};
    if (!regexpNodeList)
        return [false, null];
    pathNodeList.forEach(function (item, index) {
        if (typeof item === 'object') {
            matches[item.name] = regexpNodeList[index];
        }
    });
    return [true, matches];
}
exports.getPathMatches = getPathMatches;
/** @hidden */
function _onRequestWithOptions(handler) {
    var cloudFunction = function (req, res) {
        return handler(req, res);
    };
    return cloudFunction;
}
exports._onRequestWithOptions = _onRequestWithOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm92aWRlcnMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTSxJQUFBLEtBQTBCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFqRCxZQUFZLGtCQUFBLEVBQUUsS0FBSyxXQUE4QixDQUFDO0FBRTFEOzs7O0dBSUc7QUFDSCxTQUFnQixTQUFTLENBQ3ZCLE9BQStEO0lBRS9ELE9BQU8scUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUpELDhCQUlDO0FBRUQsU0FBZ0IsY0FBYyxDQUM1QixXQUFtQixFQUNuQixFQUEwQjtRQUF4QixJQUFJLFVBQUE7SUFFTixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEMsSUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsSUFBSSxDQUFDLGNBQWM7UUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztRQUMvQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBZkQsd0NBZUM7QUFFRCxjQUFjO0FBQ2QsU0FBZ0IscUJBQXFCLENBQ25DLE9BQStEO0lBRS9ELElBQU0sYUFBYSxHQUFRLFVBQUMsR0FBWSxFQUFFLEdBQWE7UUFDckQsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUNGLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFQRCxzREFPQyJ9