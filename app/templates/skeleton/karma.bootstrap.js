var mockConfig = {
    "newGames": ["megafortune","blacklagoon","elementstheawakening","europeanroulette","piggyriches","secretofthestones","simsalabim","spacewars","spellcast"],
    "gameHost":"https://garbo-game-test.casinomodule.com",
    "production":false,
    "accept-language":"en-US,en;q=0.8",
    "country":"SE"
};

angular.amd.basePath = '/base/src/';
window.__karma__.loaded = function () {};

function createNode() {
    var node = window.document.createElement('script');
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    node.async = true;
    return node;
}

var node, file;

for (file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/spec\.js$/.test(file)) {
        node = createNode();
        node.src = file;
        window.document.body.appendChild(node);
    }
  }
}
angular.resumeBootstrap = function ()  {
    window.__karma__.start();
}
