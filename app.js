import { Home } from './containers/Home.js';
import { Types } from './containers/Types.js';
import { Strategies } from './containers/Strategies.js';
import { Risks } from './containers/Risks.js';
import { Calculator } from './containers/Calculator.js';
import { Navigation } from './containers/Navigation.js';

const appConfig = {
    name : 'Investment calculator',
    logo : '',
};

const routes = {
    '/'           : {'view': '', 'module': Home},
    '/types'      : {'view': 'Types', 'module': Types},
    '/strategies' : {'view': 'Strategies', 'module': Strategies},
    '/risks'      : {'view': 'Risks', 'module': Risks},
    '/calculator' : {'view': 'Calculator', 'module': Calculator},
};

const selectRoute = () => {

    // E. g. https://domain.com/#/test -> '/test' is returned
    const path = location.hash.slice(1).toLowerCase() || '/';
    
    return routes[path] ? routes[path]['module'] : Home;
};

const createNavigation = {

};

const main = async () => {
    const logo = document.getElementById('container-logo') || null;
    const navigationItems = document.getElementById('container-navbar-items') || null;
    const main = document.getElementById('container-main') || null;

    const content = selectRoute();

    logo.innerHTML = appConfig.name;
    navigation.innerHTML = await Navigation.render();
    main.innerHTML = await content.render();
}

// Listen on hash change:
window.addEventListener('hashchange', main, false);

// Listen on page load:
window.addEventListener('load', main);

