export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;

  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await apiRes.json();

    if (data.choices && data.choices.length > 0) {
      res.status(200).json({ result: data.choices[0].message.content });
    } else {
      res.status(500).json({ result: 'No response from AI' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'Something went wrong' });
  }
}
