import { endUrl } from "../../constants";

export async function getUser({ queryKey }) {
    const [, userId] = queryKey;
    console.log(userId);
    const response = await fetch(`${endUrl}/user?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}