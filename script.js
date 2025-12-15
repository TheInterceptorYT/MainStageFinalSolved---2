// Sequence puzzle
const correctSequence = ["cupcake", "pizza", "partyhat", "paperplate"];
let playerSequence = [];
let tableItems = [null, null, null, null, null];

function placeItem(itemId) {
  const tableRow = document.getElementById("tableRow");

  for (let i = 0; i < tableItems.length; i++) {
    if (!tableItems[i]) {
      tableItems[i] = itemId;

      const img = document.createElement("img");
      img.src = `images/${itemId}.png`;
      img.classList.add("contain-image");
      tableRow.children[i].appendChild(img);
      break;
    }
  }

  playerSequence.push(itemId);

  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== correctSequence[i]) {
      playerSequence = [];
      return;
    }
  }

  if (playerSequence.length === correctSequence.length) {
    moveKeyToNotepad();
    playerSequence = [];
  }
}

// Move key to where notepad originally was
function moveKeyToNotepad() {
  const notepad = document.getElementById("notepad");
  const tableRow = document.getElementById("tableRow");

  if (notepad) {
    const img = document.createElement("img");
    img.src = "images/key1.png";
    img.classList.add("contain-image");
    // replace notepad's bottom box
    const parentBox = notepad.parentElement;
    parentBox.innerHTML = "";
    parentBox.appendChild(img);
    notepad.remove();
  }
}

// Open notepad modal
function openNotepad() {
  const notepad = document.getElementById("notepad");
  if (!notepad) return;

  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = "images/stickynote.png";
  modal.style.display = "flex";

  // Notepad disappears when code solved
  setTimeout(() => {
    if (modalImage.src.includes("stickynote.png")) {
      notepad.remove();
    }
  }, 500);
}

// Show other modal images (optional)
function showModal(imageElement) {
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imageElement.src;
  modal.style.display = "flex";
}

function hideModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Close modal when clicking outside image
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) hideModal();
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") hideModal();
});

// Ensure modal hidden on load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myModal").style.display = "none";
});

// Inventory toggle
function toggleBottomRow() {
  document.getElementById("bottomRow").classList.toggle("hidden");
}

// Redirect to website
function goLeft() {
  window.location.href =
    "https://theinterceptoryt.github.io/MainFloorFinal---2/";
}

// Move key to bottom row
function collectKey() {
  const key = document.querySelector(".movekey"); // Select the key
  if (!key) return;

  // Remove key from current position
  key.parentElement.removeChild(key);
  keyJingle.play();

  // Find first empty slot in bottom row
  const bottomRow = document.getElementById("bottomRow");
  const slots = bottomRow.children;
  for (let i = 0; i < slots.length; i++) {
    if (slots[i].children.length === 0) {
      slots[i].appendChild(key);
      bottomRow.classList.remove("hidden"); // Show bottom row if hidden
      break;
    }
  }

  // Optional: adjust key styling for bottom row
  key.style.position = "relative";
  key.style.top = "0px";
  key.style.right = "0px";

  // Remove clickable2 class so it no longer responds to hover/click
  key.classList.remove("clickable2");
}
