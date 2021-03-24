import NoLayout from '../components/xLayout';
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import "antd/dist/antd.less";
import { NextJSContext } from 'next-redux-wrapper';
type NextContext = NextJSContext & AppProps & {}

const NextApp: NextPage<NextContext> = (props) => {
  const { Component, pageProps, store } = props;
  return (
    <Provider store={store}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <title>XXXXXXXXXzy</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/ico' />
        <script src="/darkmode.js" type="text/javascript"></script>
      </Head>
      <NoLayout>
        <Component {...pageProps} />
      </NoLayout>
    </Provider>
  )
}

NextApp.getInitialProps = async (context: NextContext) => {
  const { ctx, Component } = context;
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  // return { pageProps }
  // fxxk keng
  if (Object.keys(pageProps).length > 0) {
    return { pageProps };
  } else {
    return {};
  }
}

export default withRedux(createStore)(withReduxSaga(NextApp));
