
let jsonData;



const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function (response) {
        if (this.status == 200) {
            const data = this.responseText;
            const todo = JSON.parse(data);
            console.log(todo, "todo Object while reading");
            //reading the json list of todo data
            jsonData = todo;
        }
    });
    xhr.open('GET', 'tododata/lists.json');
    xhr.send();
}


//Adding JSON data lists to DOM
// asyncCall();
async function asyncCall() {
    let result = await fetchData();
    console.log(result, "This is special");
}


let listobj;

//Converting objects of list into nodes to be used in DOM 

domHandler = (element) => {
    let list = document.createElement("li");
    list.setAttribute("id", element.id);
    list.classList.add(element.status);

    let title = document.createElement("h1");
    title.classList.add("title-" + element.id);
    title.innerHTML = element.title;

    // Click event for a todo event to be opened

    title.addEventListener('click', () => {
        let listobjtitle = document.getElementById(element.id);

        //status is the string given whether a todo is opened or closed

        let status = listobjtitle.getAttribute('class');
        if (status == "open") {
            list.setAttribute("class", "closed");
        } else {
            list.setAttribute("class", "open");
        }
    });
    let description = document.createElement("p");
    description.classList.add("description-" + element.id);
    description.innerHTML = element.description;

    let duedate = document.createElement("p");
    duedate.classList.add("duedate-" + element.id);
    duedate.innerHTML = element.duedate;

    let duetime = document.createElement("p");
    duetime.classList.add("duetime-" + element.id);
    duetime.innerHTML = element.duetime;

    let status = document.createElement("h5");
    status.classList.add("status-" + element.id);
    status.innerHTML = element.status;

    let deletebtn = document.createElement("span");
    deletebtn.classList.add("material-icons-outlined");
    deletebtn.classList.add("delete-" + element.id);
    deletebtn.innerHTML = "Mark Complete";
    deletebtn.addEventListener('click', () => {
        let deltitemId = ((((deletebtn.getAttribute("class")).split(" ")))[1].split("-"))[1];
        let listsForDeletion = document.querySelectorAll("li");
        (listsForDeletion).forEach(element => {
            if (element.getAttribute("id") == deltitemId) {
                title.classList.add("done");
                list.setAttribute("class", "closed");
                deletebtn.innerHTML = "Completed";
            }
        });
    });

    list.appendChild(title);

    let divdetails = document.createElement("div");
    divdetails.classList.add("div-details");

    let divdetailsDescription = document.createElement("div");
    divdetailsDescription.classList.add("div-details-description");
    divdetailsDescription.appendChild(description);

    let divdetailsDue = document.createElement("div");
    divdetailsDue.classList.add("div-details-due");
    divdetailsDue.appendChild(duedate);
    divdetailsDue.appendChild(duetime);

    divdetails.appendChild(divdetailsDescription);
    divdetails.appendChild(divdetailsDue);

    list.appendChild(divdetails);
    list.appendChild(deletebtn);

    listobj.appendChild(list);


}

let addbtn;
let btnopener;

//Adding JSON objects to the DOM using loops
setTimeout(() => {
    console.log(jsonData);
    btnopener = document.querySelector('button.main-button');
    btnopener.addEventListener("click", inputOpener);

    listobj = document.querySelector("ol");

    addbtn = document.querySelector(".add-button");
    addbtn.addEventListener("click", taskAdder);


    jsonData.forEach(element => {
        domHandler(element);
    });
}, 800);

fetchData();

// fetch all data of todo list inputs
let taskAdder = () => {
    let titleInput = document.querySelector(".title"); // title
    let descriptionInput = document.querySelector(".description"); //description
    let dueDateInput = document.querySelector(".dueDate"); //due date
    let dueTimeInput = document.querySelector(".dueTime");//duetime
    let titleIncoming = titleInput.value;
    let descriptionIncoming = descriptionInput.value;
    let dueDateIncoming = dueDateInput.value;
    let dueTimeIncoming = dueTimeInput.value;
    let currlist = document.querySelectorAll("ol>li");
    let newItemId = currlist.length + 1;
    let itemtoaddintodo = {
        "id": newItemId,
        "title": titleIncoming,
        "description": descriptionIncoming,
        "duedate": dueDateIncoming,
        "duetime": dueTimeIncoming,
        "status": "open"
    }
    // error handler for the elements to be added in todo
    if (errorHandler(itemtoaddintodo)) {
        console.log(itemtoaddintodo);
        domHandler(itemtoaddintodo);
        inputClearer();
        inputOpener();
    } else {
        alert("Enter a valid todo item.");
        inputClearer();
        inputOpener();
    }
}

let inputClearer = () => {
    document.querySelector(".title").value = "";
    document.querySelector(".description").value = "";
    document.querySelector(".duedate").value = "";
    document.querySelector(".duetime").value = "";
}

// Error handling to return a valid input while adding a new todo item.

function errorHandler(element) {

    //  returns true if length of elements is greater than 0 esle false...
    
    let isValid = true;
    // lenghth of title
    if (!(element.title).length > 0) {
        isValid = false;
    } else if (!(element.description).length > 0) {
        isValid = false;
    } else if (!(element.duedate).length > 0) {
        isValid = false;
    } else if (!(element.duetime).length > 0) {
        isValid = false;
    }
    return isValid;
}

let inputOpener = () => {
    let inputSection = document.querySelector("div.input-section");
    let status = inputSection.getAttribute('status');
    console.log(status, "Input Openers");
    if (status == "closed") {
        inputSection.setAttribute("status", "open");
    }else{
        inputSection.setAttribute("status", "closed");
    }
}