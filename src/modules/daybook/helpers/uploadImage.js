import axios from 'axios';

const uploadImage = async (file) => {
  if(!file) return;
  try {
    const formData = new FormData();
    formData.append('upload_preset', 'curso-vue');
    formData.append('file', file);
    const url = 'https://api.cloudinary.com/v1_1/codeslator/image/upload';
    const { data } = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(data);
    return data.secure_url;
  } catch (err) {
    console.log('Error uploading image', err);
    return null;
  }
};

export default uploadImage;