export default async function fetchContrast(backgroundColor, textColor) {
  try {
    const response = await fetch("/api/contrast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ colors: [backgroundColor, textColor] }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Contrast check failed", err);
    return null;
  }
}
