


function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

// Usage:

preload([
    'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Immortal%2C_Olve_%E2%80%9EAbbath%E2%80%9C_Eikemo_12.jpg/640px-Immortal%2C_Olve_%E2%80%9EAbbath%E2%80%9C_Eikemo_12.jpg',
    'img/loader.jpg',
]);