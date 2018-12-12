// when a message is recieved
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    let ogExists = document.getElementById('ogDataModal');

    // check if current page previously appended the modal for Open Graph listing
    if (!ogExists && request.data === 'load modal') {
        wrapperDiv = document.createElement("div");
        wrapperDiv.setAttribute('id', 'ogDataWrapperDiv');

        iframeElement = document.createElement("iframe");
        iframeElement.setAttribute("style","width: 100%; height: 100%;");
        
        wrapperDiv.appendChild(iframeElement);
        
        modalDialogParentDiv = document.createElement("div");
        modalDialogParentDiv.setAttribute('id', 'ogDataModal');

        modalDialogSiblingDiv = document.createElement("div");
        
        modalDialogTextDiv = document.createElement("div"); 
        modalDialogTextDiv.setAttribute("style" , "text-align:center");
        modalDialogTextDiv.setAttribute('id', 'modalDialogTextDiv');
        
        modalDialogTextSpan = document.createElement("span"); 
        modalDialogText = document.createElement("strong"); 
        modalDialogText.innerHTML = "Processing...  Please Wait.";
        modalDialogText.setAttribute('id', 'ogDateProcessing');
        
        breakElement = document.createElement("br"); 
        imageElement = document.createElement("img"); 
        imageElement.src = chrome.extension.getURL("/css/loading.gif");
        imageElement.setAttribute('id','ogDataImg');

        tableDataDiv = document.createElement("div");
        tableDataDiv.setAttribute('id', 'ogData');
        
        modalDialogTextSpan.appendChild(modalDialogText);
        modalDialogTextDiv.appendChild(modalDialogTextSpan);
        modalDialogTextDiv.appendChild(breakElement);
        modalDialogTextDiv.appendChild(breakElement);
        modalDialogTextDiv.appendChild(imageElement);
        modalDialogTextDiv.appendChild(tableDataDiv);
        
        modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
        modalDialogParentDiv.appendChild(modalDialogSiblingDiv);
        
        // append modal related elements to body
        document.body.appendChild(wrapperDiv);
        document.body.appendChild(modalDialogParentDiv);

        setTimeout(() => {
            const metas = document.getElementsByTagName('meta');
            if (metas.length > 0) {
                const row = [];
                for (let index = 0; index < metas.length; index++) {
                    const element = metas[index];
                    if (element.getAttribute('property') && element.getAttribute('property').includes('og')) {
                        row.push([element.getAttribute('property'), element.getAttribute('content')]);
                    }
                }
                createTable(row);
            }
        }, 1000);
    }
});

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    table.setAttribute('id', 'data');

    tableData.forEach((rowData) => {
        var row = document.createElement('tr');

        rowData.forEach((cellData) => {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    span = document.createElement('span');
    span.innerHTML = 'No Open Graph found!';
    document.getElementById('ogData').appendChild( tableData.length > 0 ? table : span);
    document.getElementById('ogDataImg').style = 'display: none;';
    document.getElementById('ogDateProcessing').style = 'display: none;';
    h3 = document.createElement("h3")
    h3.innerHTML = 'Based on the raw tags, we constructed the following Open Graph properties';
    h3.setAttribute('id', 'ogDataTitle');
    h3.style = 'text-align: left;font-weight: bold;';

    if (tableData.length > 0) {
        document.getElementById('modalDialogTextDiv').prepend(h3);
    }
}