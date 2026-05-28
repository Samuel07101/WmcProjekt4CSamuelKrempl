// +page.js
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    
        const [matchesResponse, newsResponse] = await Promise.all([
            fetch('http://localhost:3000/match/1'), // Beispiel für Woche 1
            fetch('http://localhost:3000/news')
        ]);

        if (!matchesResponse.ok || !newsResponse.ok) {
            throw new Error('Fehler beim Laden der Daten vom Server');
        }

        const matches = await matchesResponse.json();
        const news = await newsResponse.json();

        return {
            matches,
            news
        };
    
}