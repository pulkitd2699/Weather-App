// console.log('client side js file is loaded')
//to make request from client side javascript use fetch api

//accessing data from puzzle.mead.io/puzzle

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

//selecting html tags
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

//add event listener
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    //p1 with loading message and p2 empty
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //fetching when form is submitted
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else{
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}) 


//note: when submitting form the browser tends to refresh resetting all contents therefore
    //we use event.preventDefualt to preserve the state of the browser