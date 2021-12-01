import cloudinary from 'cloudinary';
import axios from 'axios';
import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.v2.config({
  cloud_name: 'codeslator',
  api_key: '955348898195277',
  api_secret: 'nIXQPK3gfQ-6kCBQkywqawjOFgo'
});


describe('Upload Image Helper', () => {
  test('Should upload a file and return the url', async (done) => {
    const { data } = await axios.get('https://res.cloudinary.com/codeslator/image/upload/v1637331863/journal-app/bxybuhrpfafjaurgwlnm.jpg', {
      responseType: 'arraybuffer',
    });
    const file = new File([data], 'Pokemon.jpg');
    const url = await uploadImage(file);
    expect(typeof url).toBe('string');

    // Take the id
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    // console.log(segments, imageId)
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    })
  });
});