const demo = () =>
  "Webpack Boilerplate v5.16.0 - SASS/PostCSS, ES6/7, browser sync, source code listing and more.";

// eslint-disable-next-line no-console
console.log(demo());

const addBox = document.querySelector(".add-box");

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

const getData = async (api) => {
  let result = await fetch(api).then((res) => {
    return res.json();
  });
  return result;
};

addBox.addEventListener("click", (e) => {
  console.log(e);
});

// showMenu.addEventListener("click", (e) => {
//   console.log(e);
// });

// function showMenu(elem) {
//   console.log(elem);
//   elem.parentElement.classList.add("show");
//   document.addEventListener("click", (e) => {
//     if (e.target.tagName != "I" || e.target != elem) {
//       elem.parentElement.classList.remove("show");
//     }
//   });
// }

// const deleteNote = (noteId) => {
//   let confirmDel = confirm("Are you sure you want to delete this note?");
//   if (!confirmDel) return;
//   notes.splice(noteId, 1);
//   localStorage.setItem("notes", JSON.stringify(notes));
//   showNotes();
// };

// const updateNote = (noteId, title, filterDesc) => {
//   let description = filterDesc.replaceAll("<br/>", "\r\n");
//   updateId = noteId;
//   isUpdate = true;
//   addBox.click();
//   titleTag.value = title;
//   descTag.value = description;
//   popupTitle.innerText = "Update a Note";
//   addBtn.innerText = "Update Note";
// };

const showNotes = (notes) => {
  console.log(notes);
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    // let filterDesc = note.description.replaceAll("\n", "<br/>");
    // let filterDesc = notes[id].content;
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.heading}</p>
                            <span>${note.content}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="show()" class="menu-button fa fa-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${note._id}, '${note.heading}', '${note.content}')"><i class="fa-solid fa-pen"></i></i>Edit</li>
                                    <li onclick="deleteNote(${note._id})"><i class="fa fa-trash" aria-hidden="true"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
};

getData("http://localhost:8080/get-todo").then((res) => {
  let title = res[0].heading;
  let content = res[0].content;
  showNotes(res);
});

function show() {
  console.log("hello");
}
// const showMenuButton = document.querySelector(".add-box .menu-button");
// console.log(showMenuButton);
