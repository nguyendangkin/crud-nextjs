export async function POST(request: Request) {
    const res = await request.json();
    const accessToken = res?.access_token;

    if (!accessToken) {
        return Response.json({ message: "Không có Token" }, { status: 400 });
    }

    const headers = new Headers();
    headers.append(
        "Set-Cookie",
        `access_token=${accessToken}; Path=/; HttpOnly`
    );

    return Response.json(
        { res },
        {
            status: 200,
            headers,
        }
    );
}

export async function DELETE(request: Request) {
    const headers = new Headers();
    headers.append("Set-Cookie", "access_token=; Path=/; HttpOnly; Max-Age=0");
    headers.append("Set-Cookie", "refresh_token=; Path=/; HttpOnly; Max-Age=0");

    return Response.json(null, {
        status: 200,
        headers,
    });
}
