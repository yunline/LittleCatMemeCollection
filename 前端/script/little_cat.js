function set_column_count() {//按照分辨率调整预览列数
    $("#cat_area").attr(
        "style",
        `column-count:${Math.ceil(document.body.clientWidth / 800)};`
    );
}

function load_cat(data, status) {//加载猫猫
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
            <div class="cat_img_box"><img src="${cat_img_path}" class="cat_img"></div>
            <div class="cat_text">
                <h2 class="cat_link">${cat}</h2>
                <p>作者：${data[cat]["auther"] == "" ? "未知" : data[cat]["auther"]}</p>
                <p>简介：${data[cat]["description"]}</p>
            </div>
        </div>
        `;
        $("#cat_area").append(_html);
    }
}

function spawn_particle(event) {//生成粒子
    for (i = 0; i < 10; i += 1) {
        var id = Math.floor(Math.random() * 10000)
        $("body").append(`
                <img style="left:${event.clientX - 25}px;top:${event.clientY - 25}px" src="./img/icon.png" id="${id}" class="particle">
            `);

        function _factory(_id) {
            return (function () {
                $(`#${_id}`).remove()
            })
        }
        setTimeout(_factory(id), 2000);

        var distY = document.body.clientHeight * (Math.random() > 0.5 ? -1 : 1);
        var dixtX = distY / Math.tan(Math.random() * Math.PI);
        $(`#${id}`).animate({
            top: `+=${distY}px`,
            left: `+=${dixtX}px`,
            opacity:0
        }, {
            duration: (Math.random() / 2 + 1) * 2000,
            queue: false
        })
    }
}

function on_ready() {//加载完成时调用
    set_column_count();
    jQuery.ajaxSetup ({cache:false})
    $(window).resize(set_column_count);
    $.get("../小猫/index.json", load_cat);

    $("body").click(spawn_particle);
}

$("document").ready(on_ready);