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
            const unformattedString = content.value;
            content.value = formatter(unformattedString);
        } else if (menu == 'remove') {
            const formattedString = content.value;
            content.value = formattedString.replace(/(".*?")|\s+/g, (m, p1) => p1 ? p1 : '')
                                        .replace(/\\n/g, "");
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

const formatter = (str) => {
    let result = "";
    try {
        const formattedJsonString = JSON.stringify(JSON.parse(str), null, 2);
        result = formattedJsonString;
    } catch (err) {
        str = str.replace(/(".*?")|\s+/g, (m, p1) => p1 ? p1 : '');
        let r = "";
        const NEW_LINE = "\n";

        const WHITE_SPACE = (st) => {
            let s = "";
            for (let i = 0; i < st * 2; i++) {
                s += " ";
            }
            return s;
        };

        let inx = 1;
        for (let i = 0; i < str.length; i++) {
            const pr = str[i];
            if (pr == '[' || pr == '{') {
                r += pr + NEW_LINE + WHITE_SPACE(inx++);
            } else if (pr == ']' || pr == '}') {
                r += NEW_LINE + WHITE_SPACE(--inx - 1) + pr;
            } else if (pr == ',') {
                r += pr + NEW_LINE + WHITE_SPACE(inx - 1);
            } else {
                r += pr;
            }
        }
        result = r;
    }
    return result;
}

openTab("tab1");