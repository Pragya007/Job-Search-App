const extractFormData = form => Array
    .from(form.elements)
    .reduce((acc, { id, value }) => ({ [id]: value, ...acc }), {});

const getCurrencySymbol = country => {
    const currencies = {
        gb: '£',
        us: '$',
        au: '$',
        ca: '$',
        in: '₹'
    };
    return currencies[country];
}
const jobTemplate = (job, currency) => `
<div class="card">
  <div class="card-body">
  <h4 class="card-title">${job.title} up to ${currency}${job.salary_max}</h4>
  <h5>${job.location.display_name}</h5>
  <p class="card-text">${job.description}</p>
  <a href="${job.redirect_url}">View Job</a>
  </div>
</div>
`;
class JobSearch {

    constructor(searchFormSelector, resultsContainerSelector, loadingElementSelector) {
        this.searchForm = document.querySelector(searchFormSelector);
        this.resultsContainer = document.querySelector(resultsContainerSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
    }

    setCountryCode() {
        this.countryCode = 'in';
        this.setCurrencySymbol();

        fetch('http://ip-api.com/json')
            .then(results => results.json())
            .then(results => {
                this.countryCode = results.countryCode.toLowerCase();
                this.setCurrencySymbol();
            });
    }

    setCurrencySymbol() {
        this.currencySymbol = getCurrencySymbol(this.countryCode);
    }

    configureFormListener() {

        this.searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.startLoading();
            this.resultsContainer.innerHTML = '';
            const { search, location } = extractFormData(this.searchForm);
            console.log(search + location);
            fetch(`http://localhost:3000/?search=${search}&location=${location}&country=${this.countryCode}`)
                .then(response => {
                    return response.json();
                })
                .then(({ results }) => {
                    this.stopLoading();
                    return results
                        .map(job => jobTemplate(job, this.currencySymbol))
                        .join('');
                })
                .then(jobs => this.resultsContainer.innerHTML = jobs)
                .catch((e) => {
                    console.log(e);
                    this.stopLoading();}
                    );
        });
    }

    startLoading() {
        this.loadingElement.classList.add('loading');
    }

    stopLoading() {
        this.loadingElement.classList.remove('loading');
    }
}

// object of class to hit endpoints and display response in template
function homedashFunc() {
    const jobSearch = new JobSearch('#search-form', '.result-container', '.loading-element');
    jobSearch.setCountryCode();
    jobSearch.configureFormListener();
}
