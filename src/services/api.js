const local = 'http://127.0.0.1:5000'
const API_URL = process.env.DW_API_URL || local

export const askQuestion = async (question, apiKey) => {
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
