const row = document.querySelector("#row")
const text = document.querySelector("#SearchBox").value

async function getData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    let data = await response.json();

    data = data.map(item => {
        const [name, surname] = item.name.split(' ');
        return { ...item, name, surname };
    });

    return data;
}

function displayTable(filteredData) {
    row.innerHTML = filteredData.map(({ name, surname, email }) => /*html*/`
        <div class="row col-12">
            <div class="col-4 my-3">
                ${name}
            </div>    
            <div class="col-4 my-3">
                ${surname} 
            </div>    
            <div class="col-4 my-3">
                ${email}
            </div>    
        </div>
    `).join("")
}

function applyFilters(data) {
    const filterValue = document.querySelector('#SearchBox').value.toLowerCase();
    const filterType = document.querySelector('#filterDropdown').value;

    const filteredData = data.filter(item => {
        const fieldValue = item[filterType].toLowerCase();
        return fieldValue.includes(filterValue);
    });

    displayTable(filteredData);
}

async function Table() {
    try {
        const awaitData = await getData();
        applyFilters(awaitData)
    } catch (error) {
        console.log("ERRORE NEL RECUPERO DEI", error);
    }
}