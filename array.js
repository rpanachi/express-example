Array.prototype.select = function(lambda) {
    if (lambda == undefined) {
        return this;
    } else {
        result = [];
        for (i = 0; i < this.length; i++) {
            if (lambda(this[i])) {
                result.push(this[i]);
            }
        }
        return result;
    }
};
