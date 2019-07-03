import { Home } from './containers/Home.js';
import { Types } from './containers/Types.js';
import { Strategies } from './containers/Strategies.js';
import { Risks } from './containers/Risks.js';
import { Calculator } from './containers/Calculator.js';

const appConfig = {
    name : 'Investment calculator',
    logo : '',
};

const routes = {
    '/'           : {'label': '', 'container': Home},
    '/types'      : {'label': 'Types', 'container': Types},
    '/strategies' : {'label': 'Strategies', 'container': Strategies},
    '/risks'      : {'label': 'Risks', 'container': Risks},
    '/calculator' : {'label': 'Calculator', 'container': Calculator},
};

const selectRoute = () => {
    // E. g. https://domain.com/#/test -> '/test' is returned
    const path = location.hash.slice(1).toLowerCase() || '/';
    return routes.hasOwnProperty(path) ? routes[path].container : Home;
};

const createNavigation = () => {
	let navigation = '';
	for (let route in routes) {
  	    navigation += `<li class="nav-link"><a href="#${route}">${routes[route].label}</a></li>\n`;
    }
  return navigation;
};

const main = async () => {
    const logo = document.getElementById('container-logo') || null;
    const navigationItems = document.getElementById('container-navbar-items') || null;
    const mainContainer = document.getElementById('container-main') || null;

    const content = selectRoute(routes);
    
    document.title = appConfig.name;
    logo.innerHTML = `<a href="#">${appConfig.name}</a>`;
    navigationItems.innerHTML = createNavigation(routes);
    mainContainer.innerHTML = await content.render();
};


// Listen on hash change:
window.addEventListener('hashchange', main, false);

// Listen on page load:
window.addEventListener('load', main);