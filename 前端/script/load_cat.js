function set_column_count(){
    $("#cat_area").attr(
        "style",
        `column-count:${Math.ceil(document.body.clientWidth/700)};
        column-gap:1em;`
        );
}

function _callback(data, status) {
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
            <div class="cat_img">
                <img src="${cat_img_path}" width=100%>
            </div>
            <div class="cat_text">
                <h2>${cat}</h2>
                <p>作者：${data[cat]["auther"] == "" ? "未知" : data[cat]["auther"]}</p>
                <p>简介：${data[cat]["description"]}</p>
            </div>
        </div>
        `;
        $("#cat_area").append(_html);

        set_column_count();
    }
}
function on_ready() {
    $.get("../小猫/index.json", _callback);
}

$("document").ready(on_ready);
$(window).resize(set_column_count);