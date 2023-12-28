const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const backlinksContainer = document.getElementById("backlinks-container");

const backLinkForm = document.getElementById("backlink-form");
let backlinks = [];

function showModal() {
  modal.classList.add("show-modal");
  websiteName.focus();
}
function validate(nameValue, urlValue) {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert("Lütfen gerekli alanları doldurunuz!");
    return false;
  }

  if (!urlValue.match(regex)) {
    alert("Lütfen geçerli bir webiste adresi giriniz!");
    return false;
  }
  return true;
}

function deleteBacklink(url) {
  backlinks.forEach((backlink, i) => {
    if (backlink.url === url) {
      backlinks.splice(i, 1);
    }
  });
  localStorage.setItem("backlinks", JSON.stringify(backlinks));
  fetchBackLinks();
}

function buildBackLinks() {
  backlinksContainer.textContent = "";
  backlinks.forEach((backlink) => {
    const { name, url } = backlink;
    const item = document.createElement("div");
    item.classList.add("item");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("onclick", `deleteBacklink('${url}')`);

    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");

    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;

    linkInfo.appendChild(link);
    item.append(closeIcon, linkInfo);
    // item.appendChild(closeIcon);
    // item.appendChild(linkInfo);
    backlinksContainer.appendChild(item);
  });
}

function fetchBackLinks() {
  if (localStorage.getItem("backlinks")) {
    backlinks = JSON.parse(localStorage.getItem("backlinks"));
  }
  buildBackLinks();
}

function storeBackLink(e) {
  e.preventDefault();
  const nameValue = websiteName.value;
  let urlValue = websiteUrl.value;

  if (!urlValue.includes("https://" && !urlValue.includes("http://"))) {
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue);

  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const backlink = {
    name: nameValue,
    url: urlValue,
  };
  backlinks.push(backlink);
  localStorage.setItem("backlinks", JSON.stringify(backlinks));
  modal.classList.remove("show-modal");
  fetchBackLinks();
  backLinkForm.reset();
  websiteName.focus();
}

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

backLinkForm.addEventListener("submit", storeBackLink);

fetchBackLinks();
