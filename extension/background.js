chrome.browserAction.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
})

// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, current_tab_info => {
//         console.log(current_tab_info.url);
//     });
// });

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.message === 'insert') {
        console.log(payload);
        let r = insert_records(req.payload);

        r.then(res => {
            chrome.runtime.sendMessage({
                message: "insert_success",
                payload: res
            })
        })
    }
    else if (req.message === 'get') {
        let r = get_records(req.payload);

        r.then(res => {
            chrome.runtime.sendMessage({
                message: "get_success",
                payload: res
            })
        })
    }
    else if (req.message === 'update') {
        let r = update_record(req.payload);

        r.then(res => {
            chrome.runtime.sendMessage({
                message: "update_success",
                payload: res
            })
        })
    }
    else if (req.message === 'delete') {
        let r = delete_records(req.payload);

        r.then(res => {
            chrome.runtime.sendMessage({
                message: "delete_success",
                payload: res
            })
        })
    }

});

/* --------------------------------------------------------- */
/* DATABASE stuff */

let db = null;
let shorts = [
    {
        ".thx": "Thank you for contacting Techforce!"
    },

    {
        ".sig": "Nyan Htet \nTechforce Analyst | Portland, OR"
    }

]

function create_db() {

    const request = window.indexedDB.open('database');

    request.onerror = function (event) {
        console.log("Problem opening DB");
    }

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        let objectStore = db.createObjectStore('shorts', {
            keyPath: 'shortcut'
        })
        objectStore.transaction.oncomplete = function (event) {
            console.log("Shortcut created");
        }

    }

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("DB Opened");
    }

}

function delete_db() {

    const request = window.indexedDB.delete('Database');

    request.onerror = function (event) {
        console.log("Problem opening DB");
    }

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("DB Deleted");
    }

}

function insert_records(records) {
    if (db) {

        const insert_transaction = db.transcation("shorts", "readwrite");
        const objectStore = insert_transaction.objectStore("shorts");

        return new Promise((resolve, reject) => {

            insert_transaction.oncomplete = function () {
                console.log("inserted");
                resolve(true);
            }

            insert_transaction.onerror = function () {
                console.log("Error inserting records");
                resolve(false);
            }

            records.forEach(s => {
                let request = objectStore.add(s);

                request.onsuccess = function () {
                    console.log("Added", s);
                }

            });


        })

    }
}


function get_record(record) {

    if (db) {

        const get_transaction = db.transcation("shorts", "readwrite");
        const objectStore = insert_transaction.objectStore("shorts");


        return new Promise((resolved, reject) => {

            get_transaction.oncomplete = function () {
                console.log("Get transaction completed");
            }

            get_transaction.onerror = function () {
                console.log("Error getting records");
            }

            let request = objectStore.get(shortcut);

            request.onsuccess = function (event) {
                resolve(event.target.result);
            }
        })
    }
}
    function update_record(record) {

        if (db) {

            const put_transaction = db.transcation("shorts", "readwrite");
            const objectStore = insert_transaction.objectStore("shorts");

            return new Promise((resolve, reject => {

                put_transaction.oncomplete = function () {
                    console.log("all put transaction completed");
                    resolve(true);
                }

                put_transaction.onerror = function () {
                    console.log("Error updating records");
                    resolve(false);
                }

                objectStore.put(record);

            }));

        }

    }


    function delete_record(shortcut) {

        if (db) {

            const put_transaction = db.transcation("shorts", "readwrite");
            const objectStore = insert_transaction.objectStore("shorts");


            return new Promise((resolve, reject) => {

                delete_transaction.oncomplete = function () {
                    console.log("all delete transaction completed");
                    resolve(true);
                }

                delete_transaction.onerror = function () {
                    console.log("Error deleting records");
                    resolve(flase);
                }

                objectStore.delete(email);
            })
        }
    }

