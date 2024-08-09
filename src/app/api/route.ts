import { cookies } from "next/headers";

export async function POST(request: Request) {
    const res = await request.json();
    const accessToken = res?.access_token;
    if (!accessToken) {
        return Response.json({ message: "Không có Token" }, { status: 400 });
    }
    return Response.json(
        { res },
        {
            status: 200,
            headers: {
                "Set-Cookie": `access_token=${accessToken}; Path=/; HttpOnly`,
            },
        }
    );
}
