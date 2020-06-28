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
Handlebars.registerHelper('classForStars', function (nr) {
    const empty = '<span class="rating-star" role="button"></span>'
    const full = '<span class="rating-star full" role="button"></span>'
    switch (nr) {
        case 1:
            return full + empty + empty + empty + empty;
        case 2:
            return full + full + empty + empty + empty;
        case 3:
            return full + full + full + empty + empty;
        case 4:
            return full + full + full + full + empty;
        case 5:
            return full + full + full + full + full;
        default:
            return empty + empty + empty + empty + empty;
    }
})
