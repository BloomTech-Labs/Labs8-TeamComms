const axios = require('axios');

const generateZoomToken = require('../../validation/generateZoomToken');


// can a passed in a valid zoomId OR zoomEmail
// or defaults to below (JJ's zoom dev account)



const zoomCreate = async (zoomId_orEmail) => {
  console.log('zoomApiCalled');
  if (!zoomId_orEmail) {
    zoomId_orEmail = 'Mu72CHUtTty-hVOk3Hlc9g';
  }
  const zoomToken = generateZoomToken();
  // console.log('zoomToken', zoomToken);
  const data = { type: 1 };
  const promise = axios.post(
    `https://api.zoom.us/v2/users/${zoomId_orEmail}/meetings`,
    data,
    {
      headers: { Authorization: `Bearer ${zoomToken}` }
    }
  )

  let promiseReturnValue;
  await promise
    .then((response) => {
      // console.log('zoomResStatus', response.status);
      // console.log('zoomRes', response.data);
      promiseReturnValue = {
        status: response.status,
        data: response.data
      };   
    })
    .catch(err => {
      // console.log('zoomErrorLong', err);
      promiseReturnValue = {
        status: err.response.status,
        data: err.response.data
      };
      console.log('ERROR ==> ZOOM API:', promiseReturnValue);
    });
    return promiseReturnValue;
};
module.exports = zoomCreate;
