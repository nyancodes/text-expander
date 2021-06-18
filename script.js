let shortcuts = {}


$('form').on("submit", function (e) {
    e.preventDefault();
    shortcuts[$("#shortcut").val()] = $("#stext").val();
    console.log(shortcuts);

});




$('.test').on('keyup', function() {
     if (this.value === ".sig") {
             return this.value = this.value.replace('.sig', 'Nyan Htet \nTechforce Analyst | Portland, OR' );
             };
        
});




function add(k, v){
    
}


