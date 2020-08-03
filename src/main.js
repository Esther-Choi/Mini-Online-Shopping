//Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  // map을 사용하여 모든 리스트 요소에 callback 함수 적용 후 적용된 값을 리턴
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
        <span class="item_description">${item.gender}, ${item.gender}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", () => onButtonClick(event, items));
}

//main

// item 로드 함수 (promie 리턴)
loadItems()
  // item 로드에 성공하면 데이터를 받아서 전달
  .then((items) => {
    // 전달받은 아이템들로 displayItem 함수 호출
    displayItems(items);
    // 사용자가 클릭 시 반응을 위해 이벤트 리스너 추가
    setEventListeners(items);
  })
  // 에러가 catch
  .catch(console.log);
