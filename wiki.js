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
  loadedPage = 'test.xml';
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
      /*
      var preElements = document.querySelectorAll('pre.blocks');
      
      // Loop through each <pre> element and encode its content
      preElements.forEach(function(preElement) {
        var content = preElement.innerHTML;

        // Encode the content
        var encodedContent = content.replaceAll("<", '&lt;');

        // Replace the content of the <pre> element with the encoded content
        preElement.innerHTML = encodedContent;
      });
      */
      
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
  text = document.getElementById("text");
  text.value = text.value
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");
  } catch {}
}