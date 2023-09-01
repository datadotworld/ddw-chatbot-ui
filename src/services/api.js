const API_URL = 'https://ddw-chatbot-backend-fe4ba696a1a5.herokuapp.com'

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
