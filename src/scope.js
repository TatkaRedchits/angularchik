function Scope() {
    this.$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
    this.$watchers.push({
        value: 'init',
        watchFn: watchFn,
        listenerFn: listenerFn || function() { }
    });
};

Scope.prototype.$digest = function() {

    for (var i = this.$watchers.length - 1;  i >= 0; i--) {

        var watcher = this.$watchers[i];

        var newValue = watcher.watchFn(this);

        var oldValue = watcher.value;

        if (watcher.value == 'init') {
            watcher.value = watcher.watchFn(this);
            watcher.listenerFn(newValue, oldValue, this);
        }

        if (watcher.value != newValue) {
            watcher.listenerFn(newValue, oldValue, this);
        }

        watcher.value = newValue; 

    }

};

module.exports = Scope;