const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadImageToImgBB(apiKey, filePath) {
  const apiUrl = 'https://api.imgbb.com/1/upload';

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', fs.createReadStream(filePath));
  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (response.data.success) {
      const data = response.data.data;
      console.log('Upload success:', data);
      return data;
    } else {
      console.error('Upload failed:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('Error during upload:', error.message);
    return null;
  }
}

module.exports = {
  uploadImageToImgBB
}

// const apiKey = "badfd880e554e9747e4d7021985f1d5a";
// const filePath = path.join(__dirname, '../', 'uploads', '1703344379196.jpg')

// uploadImageToImgBB(apiKey, filePath)
//   .then(response => {
//     let res = response;
//     console.log(res.image.url);
//   })
//   .catch(error => {
//     console.error(error);
//   });
