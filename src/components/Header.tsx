import { Logo } from "./Logo";

export function Header() {
    return (
        // Tailwind uses related measures from 4px
        <header className="w-full py-5 flex items-center justify-center bg-gray-700 border-b border-gray-600">
            <Logo />
        </header>
    )
}