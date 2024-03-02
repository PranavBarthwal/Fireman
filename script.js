import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


const form = document.querySelector('[data-form]')
const queryParamsContainer = document.querySelector('[data-query-params]')
const requestHeadersContainer = document.querySelector('[data-request-headers]')
const keyValueTemplate = document.querySelector('[data-key-value-template]')
const responseHeadersContainer = document.querySelector('[data-response-headers]')


queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())

document.querySelector('[data-add-query-param-btn]').addEventListener("click", () => {
    queryParamsContainer.append(createKeyValuePair())
})

document.querySelector('[data-add-request-header-btn]').addEventListener("click", () => {
    requestHeadersContainer.append(createKeyValuePair())
})


form.addEventListener('submit', e => {
    e.preventDefault()

    axios({
        url : document.querySelector('[data-url]').value,
        method: document.querySelector('[data-method]').value,
        params: keyValuePairsToObjects(queryParamsContainer),
        headers: keyValuePairsToObjects(requestHeadersContainer)
    })
    .then((response) => {
        console.log(response)
        document.querySelector("[data-response-section").classList.remove('d-none')
        updateResponseDetails(response)
        // updateResponseEditor(response.data)
        updateResponseHeaders(response.headers)
    })
    .catch(e => {
        console.error(e)
        document.querySelector("[data-response-section").classList.remove('d-none')
        updateResponseDetails(e.response)
        // updateResponseEditor(e.response.data)
        updateResponseHeaders(e.response.headers)
    })
});


function updateResponseDetails(response) {
    document.querySelector('[data-status]').textContent = response.status
    document.querySelector('[data-time]').textContent = response.headers.date

}


function updateResponseHeaders(headers) {
    responseHeadersContainer.innerHTML = ""

    Object.entries(headers).forEach(([key, value]) => {
        const keyElement = document.createElement('div')
        keyElement.textContent = key
        responseHeadersContainer.append(keyElement)

        const valueElement = document.createElement('div')
        valueElement.textContent = value
        responseHeadersContainer.append(valueElement)
    })
     
}


function createKeyValuePair() {
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector("[data-remove-btn]").addEventListener('click', (e) => {
        e.target.closest("[data-key-value-pair]").remove()
    })

    return element
}

function keyValuePairsToObjects(container) {
    const pairs = container.querySelectorAll('[data-key-value-pair]')

    return[...pairs].reduce((data, pair) => {
        const key = pair.querySelector('[data-key]').value
        const value = pair.querySelector('[data-value]').value

        if (key === '') return data
        return { ...data, [key]: value }
    }, {})
}