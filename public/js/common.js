function renderAttachment(domNode, attachmentInfo) {
    domNode.append(`
            <div class="attachmentContainer">
                <a class="uploader_photo" target="${attachmentInfo.key}" name="${attachmentInfo.key}" href="${attachmentInfo.attachment_url}">
                <div class="uploader_image">
                    <img src="" alt="" height="45px" width="45px">
                </div>
                <div class="uploader_fileName">${attachmentInfo.key}</div>
            </a>
        </div>        
`)
}