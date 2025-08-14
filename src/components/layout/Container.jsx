export default function Container({ children }) {
    return <div className="mx-auto w-full container max-w-screen-2xl px-4 md:px-6">{children}</div>;
}