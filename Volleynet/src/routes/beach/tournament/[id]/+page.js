
/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const response = await fetch(`http://localhost:3000/tournament?id=${params.id}`);
    const ret = await response.json();

    if (ret.ok) {
        return { tournament: ret.result };
    }

    return { tournament: null };
}