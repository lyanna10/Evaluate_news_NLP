//import { Body } from "node-fetch"
  /* Function to POST data */
  const postData = async (url = "", data = {}) => {
    console.log("postData Function running", data);
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
  };


function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    if(Client.checkForName(formText)){
      // if URL valid
      console.log("::: Form Submitted :::")
    
      //post url

      postData('http://localhost:8081/meaningCloud', {url: formText})
      .then(function(res) {
          document.getElementById('core_tag').innerHTML = `core_tag: ${newData.core_tag}`;
          document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
          document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
          document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
          document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
      })
    } else {
      alert("Invalid URL: Re-enter a valid URL.");
    }
}

export { handleSubmit}


/*function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    postData('http://localhost:8081/', {name: formText})
}

const postData = async(url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-type': "application/JSON",
        },
        //body: url,
        body: JSON.stringify(data)
           // textUrl: formText
       // })
    })
    .then(res => res.json())
    .then(newData => updateUI(newData))
    .catch((error) => {
      console.log('error', error);
    })
}

function updateUI(newData) {
    console.log(newData.status.msg)
    document.getElementById('Confidence').innerHTML = `Confidence: ${newData.confidence}`;
    document.getElementById('Subjectivity').innerHTML = `Subjectivity: ${newData.subjectivity}`;
    document.getElementById('Irony').innerHTML = `Irony: ${newData.irony}`;
    document.getElementById('agreement').innerHTML = `agreement: ${newData.agreement}`;
    document.getElementById('core_tag').innerHTML = `core_tag: ${newData.core_tag}`;
  }*/

  /* fetch('http://localhost:8081/analyze', {
        method: "POST",
        credentials: 'same-origin',
        mode: 'cors',
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
    })*/

//export { handleSubmit }




