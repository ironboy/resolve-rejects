/*
  resolve-rejects 1.0.0

  April 2018 Nodebite AB, Thomas Frank

  MIT Licensed - use anywhere you want!

  Non-blocking sleep in ES7 (or, in ES6, setTimeout as a promise)
*/

/*
  Nodebite code style -> jshint settings below, also
  indent = 2 spaces, keep your rows reasonably short
  also try to keep your methods below sceen height.
*/
/* jshint
  loopfunc: true,
  trailing: true,
  sub: true,
  expr: true,
  noarg: false,
  forin: false
*/

const resolveRejects = (() => {

  let settings = {
    propName: 'r',
    errorPropName: 'err'
  };

  function setup(){
    Object.defineProperty(Promise.prototype, settings.propName, {
      configurable: true,
      get() {
        return new Promise((res) => {
          this.then(res,(x) => {
            let obj = {};
            obj[settings.errorPropName] = x;
            res(obj);
          });
        });
      }
    });
  }

  setup();

  return {
    settings(s){
      if(s.propName){
        delete Promise.prototype[settings.propName];
      }
      Object.assign(settings, s);
      setup();
    }
  }

})();

if (typeof window == 'undefined'){
  module.exports = resolveRejects;
}
else {
  window.resolveRejects = resolveRejects;
}