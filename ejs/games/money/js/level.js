var Level = function (options) {

    options = options || {};

    this.cap = options.cap || 100;
    this.pow = options.pow || 2;
    this.inc = options.inc || 10;

    this.exp = 0;
    this.level = 1;

    // set exp by given level if a level is given
    if (options.level) {

        this.level = options.level;
        this.exp = this.expForLevel(this.level);

    }

    // always override level with any given exp
    // becuase that is what is typical
    if (options.exp) {

        this.exp = options.exp;
        this.level = this.levelForExp(this.exp);

    }

};

// get the given exp for the given level
Level.prototype.expForLevel = function (level) {

    if (level <= 1) {

        return 0;

    }

    if (level > this.cap) {

        level = this.cap;

    }

    return Math.pow(this.pow, level - 1) + this.inc * (level - 1);

};

// get the level for the given exp
Level.prototype.levelForExp = function (exp) {

    var level = this.cap;
    while (level > 1) {

        if (exp >= this.expForLevel(level)) {

            return level;

        }

        level -= 1;

    }

    return level;

};

Level.prototype.remainingExp = function () {

    var nextLevel = this.level + 1;

    if (nextLevel > this.cap) {

        return 0;

    }

    return this.expForLevel(nextLevel) - this.exp;

};

Level.prototype.setByExp = function (exp) {

    this.exp = exp;
    this.level = this.levelForExp(exp);

    if (this.level === this.cap) {

        this.exp = this.expForLevel(this.cap);

    }

    this.remaining = this.remainingExp();

};
