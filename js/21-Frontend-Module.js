// old module style with HOF
window.myModule =
  window.myModule ||
  (function () {
    console.log("Module Loaded");
    function privateMethod() {
      console.log("privateMethod");
    }
    function api() {
      console.log("api");
      privateMethod();
    }
    return {
      api,
    };
  })();
