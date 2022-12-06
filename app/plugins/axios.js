export default function ({ app, store, $axios, redirect }) {
    $axios.onRequest((config) => {
      if (!config.headers.common) {
        config.headers.common = [];
      }
      if (store.getters['userToken']) {
        config.headers.common[
          'Authorization'
        ] = `Bearer ${store.getters['userToken']}`;
      }
      config.headers.common['Accept-Language'] = `${
        store.getters.currentLanguage || app.i18n.locale
      }`;
    });
  
    $axios.onError((error) => {
      if (process.env.MODE == 'dev') {
        console.log(
          `onError [${error.response && error.response.status}] ${
            error.response && error.response.request.path
          }`
        );
        console.log(error.response);
      }
      const code = parseInt(error.response && error.response.status);
      if (code === 400) {
        redirect('/400');
      }
      if (code === 500) {
        redirect('/500');
      }
      if (code === 401) {
        redirect('/');
      }
    });
    $axios.onResponse((response) => {
      if (process.env.MODE == 'dev') {
        console.log(`onResponse [${response.status}] ${response.request.path}`);
        console.log(response.data);
      }
  
      // if (
      //   parseInt(response.status) != 200 ||
      //   (parseInt(response.data.status) != 200 &&
      //     parseInt(response.data.status) != 1)
      // ) {
      //   if (response.status == 400) {
      //     redirect('/400');
      //   }
      //   if (response.status == 401) {
      //     redirect('/');
      //   }
      //   redirect('/500');
      // }
      if (response.data.data !== '' && response.data.data !== null) {
        return response.data;
      } else {
        return response;
      }
    });
  }
  