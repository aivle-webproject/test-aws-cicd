export const generateBookCover = async ({ title, description, category }) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("Current API Key:", apiKey ? "Loaded (" + apiKey.slice(0, 5) + "...)" : "Not Loaded");

    if (!apiKey) {
        throw new Error("OpenAI API Key가 설정되지 않았습니다. .env 파일을 확인해주세요.");
    }

    const prompt = `
    Book cover design for a book titled "${title}".
    Category: ${category}.
    Description: ${description}.
    Style: High quality, creative, artistic, suitable for a book cover.
    No text on the image.
  `;

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "이미지 생성 실패");
        }

        const data = await response.json();
        return data.data[0].url;
    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw error;
    }
};
