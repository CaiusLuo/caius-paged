import Image from "next/image";

export default function DefaultNotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2">
            <h2 className="font-sans text-6xl md:text-7xl font-semibold tracking-tight antialiased leading-none text-gray-900 dark:text-red py-20 px-6 text-center">
                404 Not Found
            </h2>
            <Image src="/404.svg" alt="404 Not Found" width={500} height={500} />
        </div>
    );
}