Handlebars.registerHelper('numberToStar', function (operator){
    switch (operator) {
        case 0:
            return new Handlebars.SafeString('<p class ="importance">&#9734; &#9734; &#9734; &#9734; &#9734;</p>');
        case 1:
            return new Handlebars.SafeString('<p class ="importance">&#9733; &#9734; &#9734; &#9734; &#9734;</p>');
        case 2:
            return new Handlebars.SafeString('<p class ="importance">&#9733; &#9733; &#9734; &#9734; &#9734;</p>');
        case 3:
            return new Handlebars.SafeString('<p class ="importance">&#9733; &#9733; &#9733; &#9734; &#9734;</p>');
        case 4:
            return new Handlebars.SafeString('<p class ="importance">&#9733; &#9733; &#9733; &#9733; &#9734;</p>');
        default:
            return new Handlebars.SafeString('<p class ="importance">&#9733; &#9733; &#9733; &#9733; &#9733;</p>');
    }
})
