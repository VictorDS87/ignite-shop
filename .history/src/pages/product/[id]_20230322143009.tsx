import { useRouter } from "next/router"

export default function Product() {
    const { query } = useRouter() 

    return (
        <h1>Porduct {JSON.stringify(query)}</h1>
    )
}