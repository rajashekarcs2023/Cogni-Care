export async function POST(request: Request) {
  try {
    const req = await request.json();

    const value = req.given;
    const answer = req.real;

    const res = await fetch(
      `http://127.0.0.1:5000/accuracy?given=${value}&real=${answer}.`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    const data = await res.json();

    return Response.json({ data });
  } catch (err) {
    console.log(err);
  }
}
