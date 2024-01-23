// import  { useState } from 'react';
// import CloudinaryUploader from 'react-cloudinary-uploader';

// const CloudinaryUpload = () => {
//     const [imageUrl, setImageUrl] = useState('');

//     const handleUploadSuccess = (publicId, url) => {
//         // publicId is the identifier for the uploaded file on Cloudinary (if you need it)
//         setImageUrl(url);
//     };

//     return (
//         <div>
//             <CloudinaryUploader
//                 cloudName="dcn6yeznv"
//                 uploadPreset="your_upload_preset"
//                 onSuccess={handleUploadSuccess}
//             />
//             {imageUrl && (
//                 <div>
//                     <h2>Preview</h2>
//                     <img src={imageUrl} alt="Uploaded Preview" style={{ maxWidth: '100%' }} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CloudinaryUpload;
