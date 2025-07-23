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