const fullNameInput = document.getElementById('full-name')
const emailAddressInput = document.getElementById('email-address')
const githubUsernameInput = document.getElementById('github-username')
const allInputs = document.querySelectorAll('input')
const mainDiv = document.getElementById('main-div')
const congratulationsDiv = document.getElementById('congratulations-div')
const btnSubmit = document.getElementById('btn-submit')

const congratsH1 = document.getElementById('congrats-h1')
const congratsH2 = document.getElementById('congrats-h2')

const congratsName = document.getElementById('congrats-name')
const congratsGithub = document.getElementById('congrats-github')

const ticketNumber = document.getElementById('ticket-number')

const uploadAvatarDiv = document.getElementById('upload-avatar-div')

const warningPhoto = document.getElementById('warning-photo')
const iconUploadDiv = document.getElementById('icon-upload-div')

// Validation check
function isValid (allInputs) {
    let i = 0, warning, isValid = true
    for (const el of allInputs) {
        i++

        warning = document.getElementById(`warning${i}`)
        warning.style.display = "none"
    }
    
    i = 0
    for (const el of allInputs) {
        i++

        if (el.value.trim() === "") {
            warning = document.getElementById(`warning${i}`)
            warning.style.display = "flex"
            isValid = false
        }
    }

    return isValid
}

// Submit button clicked 
btnSubmit.addEventListener('click', (event) => {
    event.preventDefault()

    if(isValid(allInputs)) {
        mainDiv.style.display = "none"
        congratulationsDiv.style.display = "flex"

        congratsH1.innerHTML = `Congrats, ${fullNameInput.value}!<br> Your ticket is ready.`
        congratsH2.innerHTML = `We've emailed your ticket to ${emailAddressInput.value}<br> and will send updates in<br> the run up to the event.`

        congratsName.innerText = `${fullNameInput.value}`
        congratsGithub.innerText = `${githubUsernameInput.value}`

        ticketNumber.innerText = `#01609`
    }
})

// Removing dropped image
function removeImageBtnClicked(event) {
    event.preventDefault()

    uploadAvatarDiv.innerHTML = `<div class="icon-upload-div" id="icon-upload-div">
                                    <img src="assets/images/icon-upload.svg" alt="icon upload" draggable="false">
                                </div>
                                <div id="footer-upload-avatar-div" class="footer-upload-avatar-div">
                                    <h3>Drag and drop or click to upload</h3>
                                </div>`
}

// Photo handling
function handlePhoto(file) {
    const maxSize = 500 // KB
    const allowedExtensions = ['jpg', 'png']
    const fileExtension = file.name.split('.').pop().toLowerCase()

    console.log(file.size);

    if ((file.size / 1024) > maxSize) {
        warningPhoto.innerText = "File too large. Please upload a photo under 500KB."
    } else if (!allowedExtensions.includes(fileExtension)) {
        warningPhoto.innerText = "Inappropriate extension."
    } else {
        uploadAvatarDiv.innerHTML = `<img src='${URL.createObjectURL(file)}' class='uploaded-photo' alt='icon upload' draggable='false'>
                                     <div id="footer-upload-avatar-div" class="footer-upload-avatar-div">
                                         <button id="remove-image-btn"><u>Remove image</u></button> <button id="change-image-btn" type="file">Change image</button> <input type="file" id="choose-file-input" class="choose-file-input">
                                     </div>`

        const footerUploadAvatarDiv = document.getElementById('footer-upload-avatar-div')
        footerUploadAvatarDiv.classList.add('photo-uploaded')

        const removeImageBtn = document.getElementById('remove-image-btn')
        removeImageBtn.addEventListener('click', removeImageBtnClicked)

        const chooseFileInput = document.getElementById('choose-file-input')
        const changeImageBtn = document.getElementById('change-image-btn')
        changeImageBtn.addEventListener('click', (event) => { 
            event.preventDefault()

            chooseFileInput.click()
        })

        chooseFileInput.addEventListener('change', (event) => {
            const file = event.target.files[0]
            if (file) handlePhoto(file)
        })
    }
}

// Allowing dragover
uploadAvatarDiv.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Photo dropping 
uploadAvatarDiv.addEventListener('drop', (event) => {
    event.preventDefault()

    const file = event.dataTransfer.files[0]
    handlePhoto(file)
})