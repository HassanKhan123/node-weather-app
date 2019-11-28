const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');


weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault();
    console.log(searchElement.value)
    messageOne.innerHTML = 'loading...';
    messageTwo.innerHTML = '';
    fetch('/weather?address=' + searchElement.value)
        .then((res) => {

            res.json()
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                        messageOne.innerHTML = data.error
                    }
                    else {

                        console.log(data.location)
                        console.log(data.forecast)

                        messageOne.innerHTML = data.location;
                        messageTwo.innerHTML = data.forecast;

                    }
                })
        })
        .catch(err => {
            messageOne.innerHTML = err
        })
})