import { useState } from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const CloudinarySingleUploader = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    setLoading(true);

    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

      const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setImage(data.secure_url);
    } catch (error) {
      toast.error('Error uploading image!');
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
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
  image: PropTypes.string,
  setImage: PropTypes.func,
};
