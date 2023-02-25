export function throttle(fn, gapTime = 500) {
    let _lastTime = null;
    return function () {
        const _nowTime = +new Date();

        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments);
            _lastTime = _nowTime;
        }
    };
}