import { Body } from "node-fetch"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/analyze', {
        method: "POST",
        headers: {
            "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
            textUrl: formText
        })
    })
    .then(res => res.json())
    .then(function(res) {
        console.log("response")
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
