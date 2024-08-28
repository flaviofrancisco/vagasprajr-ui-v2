// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="@vagasprajr" />
          <meta property="og:description" content="Site com vagas para juniores; estágio; trainee e pessoas iniciantes na área da tecnologia da informação." />
          <meta property="og:image" content="https://vagasprajr.com.br/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Flogo.51d0c4db.png&w=96&q=75" />
          <meta property="og:url" content="https://vagasprajr.com.br/" />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
