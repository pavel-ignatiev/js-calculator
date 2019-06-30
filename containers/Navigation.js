export const Navigation = {
    render: async () => {
        const view = `
        <nav class="navbar navbar-default" >
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">Investment calculator</a>
                </div>
                <ul class="nav">
                    <li class="nav-link"><a href="/types">Types</a></li>
                    <li class="nav-link"><a href="/strategies">Strategies</a></li>
                    <li class="nav-link"><a href="/risks">Risks</a></li>
                    <li class="nav-link"><a href="/calculator">Calculator</a></li>
                </ul>
            </div>
        </nav>
        `;

        return view;
    }
};