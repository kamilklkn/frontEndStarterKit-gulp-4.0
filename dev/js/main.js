//console.clear();
console.log("%c JavaScript konsoluna baktığına göre, muhtemelen bir geliştirici veya meraklı bir kullanıcı olmalısın. Gördüğün hataları yada sadece görüşlerini info@a1gim.com adresinden bizimle paylaşabilirsen, sana ve diğer kullanıcılara daha iyi bir deneyim yaşatmak için elimizden geleni yapabilirz.", 'color: #e92d53; background: #171b3d');

/*------------------------------------
  Browser Detection
------------------------------------*/
/**
 * Dizindeki sıraya göre tarayıcı id'sini geri döner
 * Bu işlev aynı zamanda herhangi bir sonuç sağlamak için sonucu önbelleğe alır..
 *
 * @returns {char}
 */
function BrowserDetection() {
    if (BrowserDetection.prototype._cachedResult)
        return BrowserDetection.prototype._cachedResult;
    var aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
        sUsrAg = navigator.userAgent,
        nIdx = aKeys.length - 1;

    for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);

    return nIdx;
}

function BrowserDetectionV2(value) {
    if (value == 'isOpera') {
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        return isOpera;
    } else if (value == 'isFirefox') {
        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';
        return isFirefox;

    } else if (value == 'isSafari') {
        // Safari 3.0+ "[object HTMLElementConstructor]"
        var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
        return isSafari;

    } else if (value == 'isIE') {
        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        return isIE;

    } else if (value == 'isEdge') {
        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;
        return isEdge;

    } else if (value == 'isChrome') {
        // Chrome 1 - 71
        var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        return isChrome;

    } else if (value == 'isBlink') {
        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;
        return isBlink;

    }

    return false;
}

/*------------------------------------
  Menu Cover İmage Display None
------------------------------------*/
function menuArrow() {
    var checkBox = document.getElementById("menuHeaderMobile");
    var menu = document.getElementById("down");
    if (checkBox.checked == true) {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

/*------------------------------------
  Scroll Down Time
------------------------------------*/
$.fn.A1gimSrollView = function() {
    return this.each(function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
}

/*------------------------------------
  Envelope Animation
------------------------------------*/
window.onload = function() {


}

/*------------------------------------
  A1gim Svg Model Animasyon Responsive
------------------------------------*/
function svgModelResponsiveAnimation() {
    //alert("Here--function--Begin");
    //console.clear();
    var svg, originalViewBox, max20em, mq, xs, xs2, sm, sm2, md, lg, xl, iphone5s, HP30, updateViewBox;
    let draw = SVG('#svgModel');
    svg = document.querySelector('#svgModel');

    // Orijinal değeri bir değişkende sakla
    originalViewBox = svg.getAttribute('viewBox');
    //alert(originalViewBox);

    // Medya sorgusu ve medya sorgusu nesnesini tanımlayın */
    mq = matchMedia("(max-width: 20em)");
    xs = matchMedia("(max-width: 576px)");
    xs2 = matchMedia("(max-width: 575.98px)");
    iphone5s = matchMedia("(max-width: 320px)");
    sm = matchMedia("(min-width: 576px)");
    sm2 = matchMedia("(max-width: 767.98px)");
    md = matchMedia("(min-width: 768px)");
    lg = matchMedia("(min-width: 992px)");
    xl = matchMedia("(min-width: 1200px)");
    HP30 = matchMedia("(min-width: 2340px)");


    /* İşleyiciyi tanımla */
    updateViewBox = function() {
        if (iphone5s.matches) {
            //alert("xs");
            svg.setAttribute('viewBox', "210 0 490 879");
        }
        if (xs.matches) {
            //alert("xs");
            svg.setAttribute('viewBox', "220 0 485 879");
        } else if (xs2.matches) {
            //alert("xs2");
            svg.setAttribute('viewBox', "220 0 485 879");
        } else if (sm.matches) {
            //alert("sm");
            svg.setAttribute('viewBox', "220 0 485 879");
        } else if (sm2.matches) {
            //alert("sm2");
            svg.setAttribute('viewBox', "220 0 485 879");
        } else if (md.matches) {
            //alert("md");
            svg.setAttribute('viewBox', "0 0 200 999");
        } else if (lg.matches) {
            //alert("lg");
            svg.setAttribute('viewBox', "0 0 853 724");
        } else {
            svg.setAttribute('viewBox', originalViewBox);
        }
    }


    //WebKit
    svg.onload = updateViewBox;

    //Firefox ve IE
    svg.addEventListener('SVGLoad', updateViewBox, true);

    //Firefox ve IE
    if (BrowserDetection() == 0) {
        alert();
        //console.log(draw);
        draw.viewbox(220, 0, 485, 879);
    } else if (BrowserDetection() == 1) {
        //console.log(draw);
        draw.viewbox(220, 0, 485, 879);
    } else if (BrowserDetection() == 3) {
        //console.log(draw);
        draw.viewbox(220, 0, 485, 879);
    }

    //Medya koşulu değişirse
    mq.addListener(updateViewBox);

};


/*------------------------------------
  Input Label Animation
------------------------------------*/
$(".input").on("focusin", function() {
    //alert("Test");
    $(this).addClass("focus").parent().find("label").animate({
        top: -52
    });
}).on("focusout", function() {
    if (!$(this).val()) {
        $(this).removeClass("focus").parent().find("label").animate({
            top: -7
        });
    }
});

/*------------------------------------
  Input Check Validation Contact Form @param:language
------------------------------------*/
function checkValidationContactForm(lang) {
    //alert("test");
    if (lang == "tr") {
        var errorName = "Lütfen ad alanını boş bırakmayınız",
            errorSurname = "Lütfen soyad alanını boş bırakmayınız",
            errorSubject = "Lütfen konu alanını boş bırakmayınız.",
            errorEmailRequired = "Lütfen geçerli bir e-posta adresi giriniz.",
            errorEmailText = "Lütfen e-posta alanını boş bırakmayınız.",
            errorMessage = "Lütfen mesaj alanını boş bırakmayınız.";
    }
    $(".contact").validate({
        rules: {
            ad: "required",
            soyad: "required",
            konu: "required",
            eposta: {
                required: true,
                email: true
            },
            mesaj: "required"
        },
        messages: {
            ad: errorName,
            soyad: errorSurname,
            konu: errorSubject,
            eposta: {
                required: errorEmailRequired,
                email: errorEmailText
            },
            mesaj: errorMessage
        }
    });
}

/*-----------------------------------------------------------------------------------------------*/
/*------------------------------------ Get Country Code Type ------------------------------------*/

/*------------------------------------------------------------------------------------------BEGIN*/
function getKeyByValue(value) {
    // Object.prototype.getKeyByValue = function (value) {
    console.log(value);
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop] === value)
                return prop;
        }
    }
};

/*------------------------------------
  Split Function
------------------------------------*/
function PhoneNumberSplit(fullPhoneNumber, countryCode) {
    let res = "";
    if (fullPhoneNumber.substr(0, 2) == "+1") {
        if (countryCode == "US" || countryCode == "CA")
            fullPhoneNumber = fullPhoneNumber.replace(" ", "-");
        res = fullPhoneNumber.split('-');
    } else {
        res = fullPhoneNumber.split(' ');
    }
    return res;
}




/*------------------------------------
Get Country Code Variables
------------------------------------*/

let allTypes = leodido.i18n.PhoneNumbers.TYPE,
    output = '',
    outputArea = document.getElementById('output');

/*------------------------------------
  Get Country Code Output
------------------------------------*/

setOutput = function(output) {
    while (outputArea.firstChild) {
        outputArea.removeChild(outputArea.firstChild);
    }
    outputArea.appendChild(document.createTextNode(output));
};

/*------------------------------------
  Get Country Code Generate
------------------------------------*/

var generate = function(countryName, countryCode) {
    let regions = countryName,
        types = 2,
        output = '',
        countryNumberNew = '';

    setOutput(output);
    var regionCode = regions;
    for (var t = 0; t < 1; t++) {
        var typeValue = types;
        var exampleNumber = leodido.i18n.PhoneNumbers.getExampleNumber(regionCode, typeValue);
    }
    var number = leodido.i18n.PhoneNumbers.formatOriginal(exampleNumber);

    let countryCodeSelect = PhoneNumberSplit(number, countryName);


    //Ülke konudu elemente ekle
    var sifirlar = "0000000000";
    document.getElementById("phone-country-code").innerHTML = countryCodeSelect[0];
    for (i = 0; i < countryCodeSelect.length; i++) {
        if (i > 0)
            countryCodeSelect[i] = sifirlar.substr(0, countryCodeSelect[i].length);
    }


    for (i = 0; i < countryCodeSelect.length; i++) {
        if (i > 0)
            countryNumberNew += countryCodeSelect[i] + " ";
    }
    countryNumberNew.trimEnd();

    $('.phone_us').mask(countryNumberNew, { placeholder: countryNumberNew });

    // output += '\n* ORIGINAL -> ' + leodido.i18n.PhoneNumbers.formatOriginal(exampleNumber, regionCode);
    // output += '\n* Dial from within FR -> ' + leodido.i18n.PhoneNumbers.formatOutOfCountryCalling('tr', exampleNumber, regionCode);


    //setOutput(output);
    return false;
}

/*------------------------------------
  Get Country Code Name Onchange
------------------------------------*/

function getCountryCodeName(event) {
    let selection = document.getElementById("callYouCountryCode");
    let rc = event.target.options[event.target.selectedIndex].dataset.countryCode;
    let e = document.getElementById("callYouCountryCode");
    let option = e.options[e.selectedIndex];
    let countryCode = option.value;
    let countryName = option.getAttribute("data-countryCode");
    //output += countryCode;
    //setOutput(output);
    generate(countryName);
}


/*------------------------------------
  Phone Input Mask
------------------------------------*/
function phoneInputMask(input) {
    //$('.phone_us').mask("(000) 000-0000", {placeholder: "(000) 000-0000"});

    console.log(input);


}

/*------------------------------------
  Navigation Change Backgroun Color Scroll Down
------------------------------------*/

$(document).ready(function() {

    var regex = new RegExp(
        '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|' +
        '(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])' +
        '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
    );

    $('.email input').on('keyup', function(e) {
        $(this).parent().toggleClass('success', regex.test($(this).val()));
    });

});
/*------------------------------------
  Check and Select Automatic Country Code
------------------------------------*/
let ip = '78.179.201.156'
let access_key = '3d23702306665325afc866e4ff5947d6';

$.ajax({
    url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key,
    dataType: 'jsonp',
    success: function(json) {
        //console.log(json);
        //Dynamically Add Options
        let counter = 0;

        if (counter == 0) {
            let select = document.getElementById("callYouCountryCode");
            if (select != null) {
                $('select[name="countryCode"]').first().val(json.location.calling_code);
                generate(json.country_code);
            }
            counter = 1;
        }
    }
});

/*------------------------------------
  Navigation Change Backgroun Color Scroll Down
------------------------------------*/
$("#Header.sh-skroller").attr({
    "data-0": "background-size[quadratic]:100%; opacity[quadratic]:1;",
    "data-50p": "background-size[quadratic]:80%; opacity[quadratic]:0;"
});
$(".nav").attr({
    "data-0p": "background-color[quadratic]: rgba(23, 24, 26, 0); padding-top[quadratic]:40px; padding-bottom[quadratic]:40px;",
    "data-10p": "background-color[quadratic]: rgba(23, 24, 26, 1); padding-top[quadratic]:20px; padding-bottom[quadratic]:20px;"
});


/*------------------------------------
  Language Switch
------------------------------------*/
document.querySelector(".language-switcher .current").addEventListener("click", function(e) {
    document.querySelector("#language-switcher").classList.toggle("open"), document.querySelector(".current img").classList.toggle("open")
})


/*------------------------------------
  Chance Body Backgroun Color
------------------------------------*/

function bodybackgroundchangecolor(className) {
    //alert(className);
    var x = document.getElementById(className);
    if (x !== null) {
        //alert(typeof (x));
        $("#body").addClass("body-grey");
    }
};

/*------------------------------------
  Change the navigation background color
------------------------------------*/
function changeNavigationBackground(heightValue) {
    $(window).scroll(function() {
        if ($(this).scrollTop() > heightValue) {
            //alert();
            $(".navbar-me").addClass("fixed-me");
        } else {
            $(".navbar-me").removeClass("fixed-me");
        }
    });
};

/*------------------------------------
  Lakasyon buttonu Gizle
------------------------------------*/
// function hideElement(contactP, hideClass) {
//     var x = document.getElementById('"'+ contactP +'"');
//     alert(x);
//     if(x !==null ) {
//         alert();
//         $(hideClass).addClass("hideButton");
//     }
// };


function hideElement() {
    var x = document.getElementById("contactP");
    if (x !== null) {
        $(".btn__directions").addClass("hideButton");
    }
};


/*------------------------------------
  Get Full Date
------------------------------------*/
function getFullDate(d1, d2) {
    var tarih = new Date();
    var yil = tarih.getFullYear();
    var ay = tarih.getMonth();
    var gun = tarih.getDay();
    var saat = tarih.getHours();
    var dakika = tarih.getMinutes();
    var saniye = tarih.getSeconds();
    document.write(gun + "/" + ay + "/" + yil + "<br>" + saat + ":" + dakika + ":" + saniye);
}

/*------------------------------------
 Hide Element
------------------------------------*/
function hideElement(value) {
    if (BrowserDetectionV2(value) == true) {
        // alert();
        $("#svg-a1gim_is_yonetim_modeli").removeClass("d-none");
    }
};