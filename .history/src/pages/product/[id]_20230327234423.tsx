import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        proce: string
        description: string
    }
}

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter()
    if (isFallback) {
        return <p>carregando</p>
    }

    function handleBuyButton() {
      console.log('pato')
    }
    
    return (
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.proce}</span>
          <p>{product.description}</p>
          <button onClick={handleBuyButton}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    )
  }

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {id: "prod_NaVGIfAZrhNPyt"}
            }
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    
        const productId = params.id; 
        
        const product = await stripe.products.retrieve(productId, {
            expand: ['default_price']
        });
        
        const price = product.default_price as Stripe.Price;
  
    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          proce: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(price.unit_amount as number / 100),
          description: product.description,
          defaultPriceId: price.id,
        }
      },
      revalidate: 60 * 60 * 1 // 1 hours
    }
  }