export async function POST(request: Request) {
  try {
    const req = await request.json();

    const query = req.query;

    const res = await fetch(`http://127.0.0.1:5000/search?query=${query}.`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();

    return Response.json({ data });
  } catch (err) {
    console.log(err);
  }
}
