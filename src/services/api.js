const local = process.env.REACT_APP_LOCAL_URL
const heroku = process.env.REACT_APP_HEROKU_URL

const API_URL = process.env.NODE_ENV === 'production' ? heroku : local

export const askQuestion = async (question) => {
    try {
        const response = await fetch(API_URL + '/get_response', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({question})
        })
        const data = await response.json()
        const responseText = data.response
        return responseText
    } catch (error) {
        console.error(error)
    }
}
