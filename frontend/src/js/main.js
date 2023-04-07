const demo = () =>
  "Webpack Boilerplate v5.16.0 - SASS/PostCSS, ES6/7, browser sync, source code listing and more.";

// eslint-disable-next-line no-console
console.log(demo());

const addBox = document.querySelector(".add-box");
const popUpBox = document.querySelector(".popup-box");
const closeBox = document.querySelector(".close");
const titleTag = document.querySelector("input");
const descriptionTag = document.querySelector("textarea");
const addButton = document.querySelector(".add");
const popupBackground = document.querySelector(".popup-background");

let isUpdate = false;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currDate = () => {
  let currentDate = new Date(),
    month = months[currentDate.getMonth()],
    day = currentDate.getDate(),
    year = currentDate.getFullYear();
  return day + " " + month + ", " + year;
};

const formData = () => {
  let title = titleTag.value;
  let description = descriptionTag.value;

  console.log("formData:", title, description, currDate());
  const data = {
    heading: title,
    content: description,
    dateAndTime: currDate(),
  };
  return data;
};

const getData = async (api) => {
  let result = await fetch(api).then((res) => {
    return res.json();
  });
  return result;
};

const showNotes = (notes) => {
  console.log(notes);
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.data.forEach((note, id) => {
    let liTag = `<li class="note" >
                        <div class="details">
                            <p>${note.heading}</p>
                            <span>${note.content}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.dateAndTime}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="menu-button fa fa-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="update('${note._id}', '${note.heading}', '${note.content}')" class="update"><i class="fa-solid fa-pen"></i>Edit</li>
                                    <li onclick="deleteNote('${note._id}')" class="delete"><i class="fa fa-trash" aria-hidden="true"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
};

getData("http://localhost:8080/get-note").then((res) => {
  console.log("get data running...");
  showNotes(res);
});

const addData = async (newNoteData) => {
  const addNoteUrl = "http://localhost:8080/add-note";

  const response = await fetch(addNoteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNoteData),
  });
};

const showMenu = (elem) => {
  console.log("hello");
  console.log(elem);
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
};

addBox.addEventListener("click", (e) => {
  console.log(e);
  popUpBox.classList.add("show");
  popupBackground.classList.add("show");
  // document.querySelector("body").style.overflow = "hidden";
  titleTag.focus();
});
closeBox.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descriptionTag.value = "";
  popUpBox.classList.remove("show");
  popupBackground.classList.remove("show");
  // document.querySelector("body").style.overflow = "auto";
});
addButton.addEventListener("click", (e) => {
  const data = formData();
  console.log(data);
  addData(data);
  popUpBox.classList.remove("show");
  popupBackground.classList.remove("show");
});

// const showMenuButton = document.querySelector(".add-box .fa-ellipsis-h");
// console.log(showMenuButton);
