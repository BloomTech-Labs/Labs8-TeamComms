const axios = require('axios');

const generateZoomToken = require('../../validation/generateZoomToken');
      
// there is an optional param built to accept (zoomId_orEmail)  
    // USER MUST BE ON THE MASTER ZOOM ACCOUNT, ENTERPRISE ONLY 
      // :'(

const zoomCreate = async (newConvo, zoomId_orEmail) => {

  console.log('zoomApiCalled');

  // defaults to (JJ's zoom dev account), if no argument.
  if (!zoomId_orEmail) {
    zoomId_orEmail = 'Mu72CHUtTty-hVOk3Hlc9g';
  }

  const zoomToken = generateZoomToken();
  // console.log('zoomToken', zoomToken);

  const body = {     
      type: 2,
      start_time: newConvo.startTime,
      topic: newConvo.title,
      agenda: newConvo.description,
      settings: {
        join_before_host: true,
        mute_upon_entry: true      
    }
  };
  
  const promise = axios.post(
    `https://api.zoom.us/v2/users/${zoomId_orEmail}/meetings`,
    body,
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
