class mt19937 {
    constructor() {
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 0x9908b0df;
        this.UPPER_MASK = 0x80000000;
        this.LOWER_MASK = 0x7fffffff;

        this.mt = new Array(this.N);
        this.index = this.N + 1;
        this.set_seed(Date.now() & 0x7FFFFFFF);
    }

    set_seed(seed) {
        this.seed = seed;
        this.mt[0] = seed >>> 0;
        for (this.index = 1; this.index < this.N; this.index++) {
            let s = this.mt[this.index - 1] ^ (this.mt[this.index - 1] >>> 30);
            this.mt[this.index] =
                ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
                (s & 0x0000ffff) * 1812433253 +
                this.index;
            this.mt[this.index] >>>= 0;
        }
    }

    next() {
        let y;
        let mag01 = [0x0, this.MATRIX_A];

        if (this.index >= this.N) {
            let kk;
            for (kk = 0; kk < this.N - this.M; kk++) {
                y =
                    (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < this.N - 1; kk++) {
                y =
                    (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] =
                    this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y =
                (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
            this.index = 0;
        }
        y = this.mt[this.index++];
        y ^= y >>> 11;
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= y >>> 18;
        return y >>> 0;
    }
}
