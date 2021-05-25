// console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const $sendLocationButton = document.querySelector('#send-location')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event) => {
    // Disable auto page reloader
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

    console.log(location)
})

$sendLocationButton.addEventListener('click', (event) => {
    event.preventDefault()

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled')

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''



    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        const { latitude, longitude } = position.coords
        console.log(position)

        fetch(`/weather-current?latitude=${latitude}&longitude=${longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log(data.location)
                    console.log(data.forecast)
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
        $sendLocationButton.removeAttribute('disabled')

    })
})