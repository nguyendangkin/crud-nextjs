export async function POST(request: Request) {
    const res = await request.json();
    const accessToken = res?.access_token;
    const publicInfo = res?.username; // Giả sử thông tin cá nhân công khai nằm trong thuộc tính `public_info`

    if (!accessToken) {
        return Response.json({ message: "Không có Token" }, { status: 400 });
    }

    const headers = new Headers();
    headers.append(
        "Set-Cookie",
        `access_token=${accessToken}; Path=/; HttpOnly`
    );
    headers.append("Set-Cookie", `public_info=${publicInfo}; Path=/;`);

    return Response.json(
        { res },
        {
            status: 200,
            headers,
        }
    );
}
