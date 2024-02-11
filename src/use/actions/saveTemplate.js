function getConstructorName() {
    let projectName = document.querySelector("#constructor-name").value;
    return projectName != "" ? projectName : "Мой Конструктор";
}

import axios from "axios";
import { toggleLoading } from "@/use/data/checkbox";
import createPostData from "@/use/actions/createPostData";
import request from "@/use/utils/request";

// сохранение щаблона
export default function saveTemplateJSON() {
    let created_post_data = createPostData();
    if (created_post_data.error) {
        console.error(created_post_data.message);
        return;
    }

    let { postData, formatName } = created_post_data;
    /**
     * https://constructor.parameters.tk/constructor
     */
    var _params = request.params;
    var projectName = getConstructorName();
    var lang = request.fullLang;
    let copyPostData = JSON.parse(JSON.stringify([...postData]));

    toggleLoading();

    const form = document.createElement("form");

    const formData = new FormData(form);

    let reqPath = "addreport";
    formData.append("name", projectName);
    formData.append("format", formatName);
    formData.append("lang", lang);
    formData.append("token", _params.token);
    formData.append("json", JSON.stringify(copyPostData));
    if (_params.constructorId) {
        reqPath = "updatereport";
        formData.append("id", _params.constructorId);
        formData.append("user_id", _params.user_id);
        console.log({
            name: projectName,
            format: formatName,
            lang: lang,
            token: _params.token,
            json: JSON.stringify(copyPostData),
            id: _params.constructorId,
            user_id: _params.user_id,
        });
    }
    else {
        console.log({
            name: projectName,
            format: formatName,
            lang: lang,
            token: _params.token,
            json: JSON.stringify(copyPostData),
        });
    }

    axios
        .post(`/ru/reports/${reqPath}`, formData)
        .catch((error) => console.error(error))
        .finally(toggleLoading);
}
