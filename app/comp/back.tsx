import Link from "next/link"

const BackBtn = () => {
    return (
        <Link href="/" className="fixed bottom-2 right-2 p-2 bg-gray-100 rounded-md shadow-md">
            Back
        </Link>
    )
}
export default BackBtn