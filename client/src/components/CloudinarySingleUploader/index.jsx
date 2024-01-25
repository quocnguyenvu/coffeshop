import  { useState } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const CloudinarySingleUploader = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    setLoading(true);

    const files = e.target.files;

    try {
      const uploadedImage = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'ml_default');

          const response = await fetch(
            'https://api.cloudinary.com/v1_1/dcn6yeznv/image/upload',
            {
              method: 'POST',
              body: formData,
            },
          );

          const data = await response.json();
          return data.secure_url;
        }),
      );

      setImage(uploadedImage);
    } catch (error) {
      toast.error('Error uploading image!');
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = () => {
    setImage([]);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {loading && <p>Loading...</p>}
      {image && !loading && (
        <CloudinaryContext
          style={{ display: 'flex', maxWidth: '100%', gap: 15, marginTop: 15 }}
        >
          <div className="upload">
            <img src={image} alt="" className="upload__img" />
            <div className="delete_button" onClick={handleImageDelete}>
              Delete
            </div>
          </div>
        </CloudinaryContext>
      )}
    </div>
  );
};

export default CloudinarySingleUploader;

CloudinarySingleUploader.propTypes = {
  image: PropTypes.array,
  setImage: PropTypes.func,
};
