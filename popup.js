document.getElementById('shorten-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById('url-input');
  const customInput = document.getElementById('custom-input');
  const resultDiv = document.getElementById('result');

  const longUrl = urlInput.value;
  const customUrl = customInput.value;
  const shortUrl = await shortenLink(longUrl, customUrl);

  resultDiv.textContent = shortUrl || 'Error: Could not shorten the link.';
});

async function shortenLink(longUrl, customUrl) {
  const apiKey = `52a83c7203b58119634a360b83109d0862fe12a3`; // Replace with your API key
  const apiUrl = `https://api-ssl.bitly.com/v4/shorten`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        long_url: longUrl,
        custom_bitlinks: [customUrl]
      })
    });

    if (response.ok) {
      const data = await response.json();
      return data.link;
    } else if (response.status === 409) {
      return 'Error: This custom URL is already in use.';
    } else {
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
