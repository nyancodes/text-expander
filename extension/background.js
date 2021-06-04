chrome.browserAction.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
  })

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url);
    });
});


let db = null;


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {


function create_db(){
    
    const request = window.indexedDB.open('Database');
    
    request.onerror = function(event){
        console.log("Problem opening DB");
    }

    request.onupgradeneeded = function(event){
        db = event.target.result; 
        let objectStore = db.createObjectStore('roster', {
            keyPath: 'shortcut'
        })
        objectStore.transaction.oncomplete = function(event) {
            console.log("Shortcut created");
        }

    }

    request.onsuccess = function(event){
        db = event.target.result; 
        console.log("DB Opened");
    }

}

function delete_db(){
    
    const request = window.indexedDB.delete('Database');
    
    request.onerror = function(event){
        console.log("Problem opening DB");
    }

    request.onsuccess = function(event){
        db = event.target.result; 
        console.log("DB Deleted");
    }

}

function insert_records(records){
    if(db){
        const insert_transaction = db.transcation("roster", "readwrite");
        const objectStore = insert_transaction.objectStore("roster");
        objectStore.add({
            
        })
    }
}










});