
chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    if (request.message === 'insert_success') {
        if(request.payload){
            alert(payload);
        }

    };
});




// insert a shortcut

$('#add_form').on('submit', event => {
    event.preventDefault();
    
    let shortcut = $('#shortcut').val();
    let stext = $('#stext').val()
    
    
    // chrome.runtime.sendMessage({
    //     message: 'insert',
    //     payload:[{
    //         shortcut : stext
    //     }]
    // })


    chrome.runtime.sendMessage({ 
        message: "insert",
        payload:[{
            shortcut: stext
        }]
    }, response => {
        if (response.message === 'success') {
            alert(`Hello ${response.payload}`);
        }
    });









})



// update a shortcut












