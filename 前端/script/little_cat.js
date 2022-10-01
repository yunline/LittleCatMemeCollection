function set_column_count(){//按照分辨率调整列数
    $("#cat_area").attr(
        "style",
        `column-count:${Math.ceil(document.body.clientWidth/800)};`
        );
}

function on_get(data, status) {
    if (status != "success") {
        console.log(status);
        return;
    }

    for (cat in data) {
        if (cat[0] == ".") {
            continue; //忽略".模板小猫"
        }
        var cat_img_path = `../小猫/${cat}/${data[cat]["img"]}`;
        var _html = `
        <div class="cat_div">
            <img src="${cat_img_path}" class="cat_img">
            <div class="cat_text">
                <h2>${cat}</h2>
                <p>作者：${data[cat]["auther"] == "" ? "未知" : data[cat]["auther"]}</p>
                <p>简介：${data[cat]["description"]}</p>
            </div>
        </div>
        `;
        $("#cat_area").append(_html);
    }
}

function on_ready() {
    set_column_count();
    $(window).resize(set_column_count);
    $.get("../小猫/index.json", on_get);
}

$("document").ready(on_ready);