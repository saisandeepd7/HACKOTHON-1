const breweriesList = document.getElementById('breweriesList');
const searchBar = document.getElementById('searchBar');
let allbreweries = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredbreweries = allbreweries.filter((obj) => {
        return (
            obj.name.toLowerCase().includes(searchString) 
            
        );
    });
    displaybreweries(filteredbreweries);
});

const loadbreweries = async () => {
    try {
        const res = await fetch('https://api.openbrewerydb.org/breweries');
        allbreweries = await res.json();
        displaybreweries(allbreweries);
    } catch (err) {
        console.error(err);
    }
};

const displaybreweries = (obj) => {
    const htmlString = obj
        .map((obj) => {
            return `
            <div class="card text-center">
  <div class="card-header">
  <h4 class="card-title">${obj.name}</h4>
  </div>
  <div class="card-body">
    <p class="type"> It's a <b>${obj.brewery_type} </b>Brewery</p>
    <p class="address">Address : ${obj.street}, ${obj.city}, ${obj.state}</p>
   
    <p class="contact"><i class="fa fa-phone"></i> : ${obj.phone}</p>
    
  </div>
  <div class="card-footer ">
  <a class="link" href="${obj.website_url}" class="btn btn-primary">Visit Website</a>
 
  </div>
</div>
        `;
        })
        .join('');
        breweriesList.innerHTML = htmlString;
};

loadbreweries();
