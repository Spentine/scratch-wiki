const url = new URL(window.location.href);

// Get the value of the 'page' parameter
renderBlocks = url.searchParams.get('render');
if (renderBlocks == null) {
  renderBlocks = true;
} else {
  renderBlocks = renderBlocks == 'true';
}

loadedPage = url.searchParams.get('page');
if (loadedPage == null) {
  loadedPage = 'homepage.xml';
}

function convert() {
  if (!renderBlocks) {
    return null;
  }
  scratchblocks.renderMatching('pre.blocks', {
    style: 'scratch3',   // Optional, defaults to 'scratch2'.
    scale: 0.75,                // Optional, defaults to 1
  });
  
  scratchblocks.renderMatching("code.b", {
    inline: true,
    style: 'scratch3',   // Optional, defaults to 'scratch2'.
    scale: 0.6,                // Optional, defaults to 1
  });
}

function renderToggle() {
  url.searchParams.set('render', !(renderBlocks));

  // Redirect to the updated URL
  window.location.href = url.href;
}

function loadFile() {
  fetch('pages/' + loadedPage)
    .then(response => response.text())
    .then(content => {
      bodyContent = '<button onclick="renderToggle();"> render toggle </button><p>current page: ' + url.searchParams.get('page') + '<br>switch to page: </p><input type="text" id="switchPage">' + content;
      document.body.innerHTML = bodyContent;
      
      console.log(document.body.innerHTML);
      
      convert(); // Call your conversion function after loading content
      var inputElement = document.getElementById("switchPage");
      inputElement.addEventListener("change", handleInputChange);
    })
    .catch(error => {
      console.error('Error loading file:', error);
    });
}

function handleInputChange() {
  var inputElement = document.getElementById("switchPage");
  var inputValue = inputElement.value;
  console.log("new page location: ", inputValue);
  url.searchParams.set('page', inputValue);

  // Redirect to the updated URL
  window.location.href = url.href;
}

function convertscratchblocks() {
  try {
  var text = document.getElementById("text");
  text.value = text.value
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");
  } catch {}
}

function renderScratchBlocks() {
  var inputDiv = document.getElementById("block-render");
  inputDiv.innerHTML = "<pre class=\"blocksInput\" id=\"inputPre\"></pre>"
  var inputPre = document.getElementById("inputPre");
  var text = document.getElementById("sbInput");
  inputPre.innerHTML = text.value;
  scratchblocks.renderMatching('pre.blocksInput', {
    style: 'scratch3',   // Optional, defaults to 'scratch2'.
    scale: 1,                // Optional, defaults to 1
  });
}

function renderScratchBlocksInput() {
  if (document.getElementById("realTime").checked) {renderScratchBlocks()}
}