import Head from 'next/head';
import { GetStaticProps } from 'next';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

// Client-side
// Server-side
// Static Site Generation

// Post do blog

// Conteudo (SSG)
// Comentários (Client-side)

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> World.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src='/images/avatar.svg' alt='Girl coding' />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Expand pra mostrar as infos do produto
  // const price = await stripe.prices.retrieve('price_1KlaUhAVAmuM2QxmcHT68o5p', {
  //   expand: ['product']
  // });

  const price = await stripe.prices.retrieve('price_1KlaUhAVAmuM2QxmcHT68o5p');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
