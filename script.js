let tabCount = 1;

function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'flex';
    }

    const tabBtns = document.querySelectorAll('#tab');
    tabBtns.forEach(tab => {
        tab.style.color = 'gray';
    });

    const tabBtn = document.querySelector(`.${tabId}-button`);
    if (tabBtn) {
        tabBtn.style.color = 'black';
    }

    selectedTab.addEventListener("click", (e) => {
        const menu = e.target.name;
        const content = selectedTab.querySelector("#content");
    
        if (menu == 'format') {
            const unformattedJsonString = content.value;
            const formattedJsonString = JSON.stringify(JSON.parse(unformattedJsonString), null, 2);
            content.value = formattedJsonString;
        } else if (menu == 'remove') {
            const formattedJsonString = content.value;
            const unformattedJsonString = JSON.stringify(JSON.parse(formattedJsonString));
            content.value = unformattedJsonString;
        } else if (menu == 'clear') {
            content.value = '';
        } else if (menu == 'rename') {
            // const btn = document.querySelector(`.${tabId}-button`);
            // btn.textContent = 'Deposit'
        }
    });
}

function addNewTab() {
    tabCount++;
    const newTabId = 'tab' + tabCount;

    // Create new tab button
    const newTabButton = document.createElement('button');
    newTabButton.className = newTabId + '-button';
    newTabButton.id = "tab";
    newTabButton.textContent = 'Tab ' + tabCount;
    newTabButton.onclick = function () {
        openTab(newTabId);
    };

    // Append new tab button to the tabs container
    const tabsContainer = document.querySelector('.tabs');
    tabsContainer.insertBefore(newTabButton, tabsContainer.lastChild);

    // Create new tab content
    const newTabContent = document.createElement('div');
    newTabContent.id = newTabId;
    newTabContent.className = 'tab-content';

    // text area
    const newTextArea = document.createElement("textarea");
    newTextArea.name =  "content";
    newTextArea.id = "content";

    // tab-menu
    const newTabMenu = document.createElement("div");
    newTabMenu.id = "tab-menu";

    // menu button
    const tabBtn = ["format", "remove", "clear"];
    tabBtn.forEach(element => {
        const btn = document.createElement("button");
        btn.name = element;
        if (element == "remove") {
            btn.textContent = "remove white space";
        } else {
            btn.textContent = element;
        }
        newTabMenu.appendChild(btn);
    });

    newTabContent.appendChild(newTextArea);
    newTabContent.appendChild(newTabMenu);

    // Append new tab content to the body
    document.body.appendChild(newTabContent);

    // Show the new tab content
    openTab(newTabId);
}

openTab("tab1");