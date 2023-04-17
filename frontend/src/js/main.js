const addBox = document.querySelector(".add-box");
const closeBox = document.querySelector(".close");
const addButton = document.querySelector(".add");
const popUpBox = document.querySelector(".popup-box");
const popUpBoxHeading = document.querySelector(".popup-box-heading");
const titleTag = document.querySelector("input");
const descriptionTag = document.querySelector("textarea");
const popupBackground = document.querySelector(".popup-background");
const warningContainer = document.querySelector(".delete-warning");
const formButton = document.querySelector(".button-container button");
const toastMessage = document.querySelector(".toast-message");
const noteDetails = document.querySelector(".note .details");

let updateId = "";
let buttonText = "";

const getUrl = (endPoints) => {
  return "http://localhost:8080/" + endPoints;
};

const toast = (message) => {
  toastMessage.style.display = "block";
  toastMessage.textContent = message;
  setTimeout(() => {
    toastMessage.classList.add("toast-popup");
  }, 3000);
  setTimeout(() => {
    toastMessage.style.display = "none";
    toastMessage.classList.remove("toast-popup");
  }, 3500);
};

const formData = () => {
  let title = titleTag.value;
  let description = descriptionTag.value;
  const data = {
    heading: title,
    content: description,
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
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.data.forEach((note, id) => {
    let liTag = `<li class="note" >
                        <div onclick="viewAndEdit('${note._id}', '${note.heading}', '${note.content}')" class="details">
                            <p>${note.heading}</p>
                            <span>${note.content}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.dateAndTime}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="menu-button fa fa-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote('${note._id}', '${note.heading}', '${note.content}')" class="update"><i class="fa-solid fa-pen"></i>Edit</li>
                                    <li onclick="deleteNote('${note._id}')" class="delete"><i class="fa fa-trash" aria-hidden="true"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
};

const show = () => {
  getData(getUrl("get-note")).then((res) => {
    showNotes(res);
  });
};
show();

const addData = async (newNoteData) => {
  const addNoteUrl = getUrl("add-note");
  const response = await fetch(addNoteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNoteData),
  });
  show();
  toast("New note created!");
};

const showMenu = (elem) => {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
};

const updateNote = (noteId, title, desc) => {
  buttonText = "Edit";
  formButton.textContent = buttonText;
  popUpBoxHeading.textContent = "Edit note";
  popUpBox.classList.add("show");
  popupBackground.classList.add("show");
  titleTag.focus();
  titleTag.value = title;
  descriptionTag.value = desc;
  updateId = noteId;
};

const updateData = async (newNoteData) => {
  let api = getUrl(`note/${updateId}`);
  const response = await fetch(api, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(newNoteData),
  });
  show();
  toast("Note updated!");
};

const deleteData = async (api) => {
  await fetch(api, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  show();
  toast("Note deleted!");
};

const deleteNote = (noteId) => {
  let api = getUrl(`delete/${noteId}`);
  warningContainer.classList.add("show");
  popupBackground.classList.add("show");
  document.querySelector(".yes").addEventListener("click", () => {
    deleteData(api);
    warningContainer.classList.remove("show");
    popupBackground.classList.remove("show");
  });
  document.querySelector(".no").addEventListener("click", () => {
    warningContainer.classList.remove("show");
    popupBackground.classList.remove("show");
  });
};

const viewAndEdit = (...noteData) => {
  updateNote(noteData[0], noteData[1], noteData[2]);
};

addBox.addEventListener("click", () => {
  popUpBoxHeading.textContent = "Add new note";
  buttonText = "Add Note";
  formButton.textContent = buttonText;
  popUpBox.classList.add("show");
  popupBackground.classList.add("show");
  titleTag.focus();
});
closeBox.addEventListener("click", () => {
  titleTag.value = descriptionTag.value = "";
  popUpBox.classList.remove("show");
  popupBackground.classList.remove("show");
});
addButton.addEventListener("click", (e) => {
  const data = formData();
  buttonText === "Add Note" ? addData(data) : updateData(data);
  popUpBox.classList.remove("show");
  popupBackground.classList.remove("show");
  titleTag.value = descriptionTag.value = "";
});

window.showMenu = showMenu;
window.updateNote = updateNote;
window.deleteNote = deleteNote;
window.deleteData = deleteData;
window.viewAndEdit = viewAndEdit;
