const local = 'http://127.0.0.1:5000/get_response'
const API_URL = process.env.DW_API_URL || local

export const askQuestion = async (question, apiKey) => {
    try {
        const response = await fetch('https://ddw-chatbot-ui-7aef951365b3.herokuapp.com/get_response', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${apiKey}`
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
