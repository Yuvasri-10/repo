export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    res.status(200).json({ result: output });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({
      result: 'Gemini Error: ' + (err.message || 'Unknown error'),
    });
  }
}
