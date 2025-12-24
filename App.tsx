const generateImage = async () => {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      images,
      aspectRatio // "16:9" | "9:16"
    })
  });

  const data = await res.json();
  setResultImage(data.image);
};
