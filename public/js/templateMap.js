var arrayRemove = function (val, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]._id == val) {
            if (i > -1) {
                array.splice(i, 1);
            }
        }
    }
    return -1;
};
var advertisement = function (template, articleInfo) {
    template = template || {};
    $('.template').append('<div id="advertiseAttachment">Upload</div>');

    $('#advertiseAttachment').uploadFile({
        uploadStr: '上传附件',
        url: '../admin/upload',
        fileName: "file",
        returnType: 'json',
        showDone: true,
        showDelete: true,
        onSuccess: function (file, data) {
            template.attachment_list = template.attachment_list || [];
            template.attachment_list.push(data._id);
        },
        deleteCallback: function (data) {
            arrayRemove(data._id, template.attachment_list);
        }
    });
    renderingPic(articleInfo);
    addEditPic(template, articleInfo.template.attachment_list);
};

var competition = function (template, articleInfo) {
    template = template || {};
    $('.template').append(`
        <div>
            <span>开始时间</span>
            <input name="start_time" type="text" class="templateInput">
        </div>
        <div>
            <span>结束时间</span>
            <input name="final_time" type="text" class="templateInput">
        </div>
        <div id="competitionAttachment">Upload</div>
        <div>
    `);

    $('#competitionAttachment').uploadFile({
        uploadStr: '上传附件',
        url: '../admin/upload',
        fileName: "file",
        returnType: 'json',
        showDone: true,
        showDelete: true,
        onSuccess: function (file, data) {
            template.attachment_list = template.attachment_list || [];
            template.attachment_list.push(data._id);
        },
        deleteCallback: function (data) {
            arrayRemove(data._id, template.attachment_list);
        }
    });

    $('#saveButton').bind('click', function () {
        template.start_time = $("input[name='start_time']").val();
        template.final_time = $("input[name='final_time']").val();
    });

    renderingPic(articleInfo);
    addEditPic(template, articleInfo.template.attachment_list);

};

var lecture = function (template) {
    template = template || {};
    $('.template').append(`
    <div>
        <span>教师</span>
        <input name="teacher" type="text" class="templateInput">
    </div>
    <div>
        <span>开始时间</span>
        <input name="time" type="text" class="templateInput">
    </div>               
    <div>
        <span>地点</span>
        <input name="location" type="text" class="templateInput">
    </div>
    <div>
        <span>主题</span>
        <input name="theme" type="text" class="templateInput">
    </div>
    `);
    $('#saveButton').bind('click', function () {
        template.teacher = $("input[name='teacher']").val();
        template.time = $("input[name='time']").val();
        template.location = $("input[name='location']").val();
        template.theme = $("input[name='theme']").val();
    })
};

var news = function (template) {
    template = template || {};
    $('.template').append(`
    <div>
        <span>开始时间</span>
        <input name="start_time" type="text" class="templateInput">
    </div>
    <div>
        <span>结束时间</span>
        <input name="end_time" type="text" class="templateInput">
    </div>
    `);

    $('#saveButton').bind('click', function () {
        template.start_time = $("input[name='start_time']").val();
        template.end_time = $("input[name='end_time']").val();
    })
};

var recruit = function (template) {
    template = template || {};
    $('.template').append(`
    <div>
        <span>开始时间</span>
        <input name="time" type="text" class="templateInput">
    </div>
    <div>
        <span>地点</span>
        <input name="location" type="text" class="templateInput">
    </div>
    <div>
        <span>面向人群</span>
        <input name="people" type="text" class="templateInput">
    </div>
    <div>
        <span>公司</span>
        <input name="company" type="text" class="templateInput">
    </div>
    `);

    $('#saveButton').bind('click', function () {
        template.time = $("input[name='time']").val();
        template.location = $("input[name='location']").val();
        template.people = $("input[name='people']").val();
        template.company = $("input[name='company']").val();
    })
};

var wechat = function (template) {
    template = template || {};
    $('.template').append(`
    <div>
        <span>微信url</span>
        <input name="url" type="text" class="templateInput">
    </div>
    `);

    $('#saveButton').bind('click', function () {
        template.url = $("input[name='url']").val();
    })
};

var map = {
    "1": advertisement,
    "2": competition,
    "3": lecture,
    "4": news,
    "5": recruit,
    "6": wechat
};

var writeTemplate = function (templateId, template, articleInfo) {
    if (!templateId) return;
    $('.template').children().remove();
    return map[templateId](template, articleInfo);
};

var renderingPic = function (articleInfo) {
    if (!articleInfo) return;
    $('.template').append('<div id="attachment"></div>');
    console.log(articleInfo)
    var attachmentList = articleInfo.template.attachment_list;
    for (var attachment of attachmentList) {
        $('#attachment').append(`
            <div class="attachmentContainer">
                <a class="uploader_photo" target="${attachment.key}" name="${attachment.key}" href="${attachment.attachment_url}">
                <div class="uploader_image">
                    <img src="" alt="" height="60px" width="60px">
                </div>
                <div class="uploader_fileName">${attachment.key}</div>
            </a>
            <a index="${attachment._id}" class="hide removeAttachment"><img src="../img/delete.png"></a>
        </div>        
`)
    }
    var $photo = $('.uploader_photo');
    $photo.each(function (i, e) {
        var $e = $(e);
        var nameArray = $e.attr('name').split('.');
        var ext = nameArray[nameArray.length - 1].toUpperCase();
        $e.find('img').attr('src', '/img/file/' + ext + '.png');
    });
    $photo.find('img').on('error', function () {
        if (this.src != '/img/file/UNKNOW.png') this.src = '/img/file/UNKNOW.png';
    })
};

var addEditPic = function (template, attachmentList) {
    var $attachmentContainer = $('.attachmentContainer');
    $attachmentContainer.each(function (i, e) {
        var $imageEditor = $(e).find($('.removeAttachment'));
        $(e).on('mouseover', function () {
            $imageEditor.removeClass('hide')
        });

        $(e).on('mouseleave', function () {
            $imageEditor.addClass('hide')
        });

        $imageEditor.on('click', function() {
            var index = $(this).attr('index');
            arrayRemove(index, attachmentList);
            template.attachment_list = attachmentList;
            $(this).parent().remove();
        })
    })

};