function getRequest() {
    var params = {};

    if (window.location.href.match(/.*\?.*/)) {
        let tmp_params = window.location.href.replace(/.*\?/, "").split("&");
        for (var p = 0; p < tmp_params.length; p++) {
            var _tmp = tmp_params[p].split("=");

            params[_tmp[0]] = _tmp[1];
        }
    }
    return params;
}
const fullLang = {
	"ru": "rus",
	"en": "eng",
	"kz": "kaz",
}
function getRequestLang() {
    var params = {};

    if (window.location.href.match(/.*\?.*/)) {
        let tmp_params = window.location.href
            .replace(/\?.*/, "")
            .split("//")
            .join("")
            .split("/");
        for (var p = 0; p < tmp_params.length; p++) {
            var _tmp = tmp_params[p].split("=");

            params[_tmp[0]] = _tmp[1];
        }
    }
    let lang = Object.keys(params)[1];
    return lang;
}

const lang = getRequestLang();
const request = {
	params: getRequest(),
	lang: lang,
	fullLang: fullLang[lang],
}

export default request