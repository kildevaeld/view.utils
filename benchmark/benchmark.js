const Benchmark = require('benchmark'),
    utils = require('../lib');

var suite = new Benchmark.Suite;

const fns = [];
for (let i = 0; i < 10; i++) {
    fns.push(() => {});
}

suite.add('callFuncCtx', () => {
    utils.callFuncCtx(fns, ['hello', 'world'], void 0);
});

suite.add('callFuncApplyForEach', () => {
    fns.forEach(m => m.apply(void 0, ['hello', 'world']));
});

suite.add('callFuncApplyFor', () => {
    const len = fns.length;
    for (let i = 0; i < len; i++)
        fns[i].apply(void 0, ['hello', 'world']);
});

suite.add('callFuncCallForEach', () => {
    fns.forEach(m => m.call(void 0, 'hello', 'world'));
});

suite.add('callFuncCallFor', () => {
    const len = fns.length;
    for (let i = 0; i < len; i++)
        fns[i].call(void 0, 'hello', 'world');
});

suite.add('callFuncCallWhile', () => {
    const len = fns.length;
    let i = -1;
    while (++i < len)
        fns[i].call(void 0, 'hello', 'world');
});



suite.on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('Slowest is ' + this.filter('slowest').map('name'));
        const all = this.filter('successful');
        const out = all.map(m => {
            return {
                name: m.name,
                mean: m.stats.mean
            }
        })
        console.log(out)
    }).run({
        async: true
    });