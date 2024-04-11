import Image from "next/image";

export default function Home() {
    return (
        <main>
            <h5 className="fw-light">Yo! Go To Dashboard!</h5>
            <Image
                src="/assets/images/main.gif"
                alt="Main"
                width={500}
                height={300}
            />
        </main>
    );
}
