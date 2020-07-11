export async function handleResponse(response) {
    if(response.ok) {
        return response.json();
    }

    if(response.status === 400) {
        const error = await response.text();
        throw new Error(error);
    }

    throw new Error("There is a problem with the netork connection.");
}

export function handleError(error) {
    console.error(`API call failed. ${error}`);
    throw error;
}