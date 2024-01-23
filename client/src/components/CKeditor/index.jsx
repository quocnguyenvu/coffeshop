import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';

import './CKEditor.scss';

const CKEditorComponent = ({ data, onDataChange }) => {
  return (
    <CKEditor
      style={{height: '200px'}}
      editor={ClassicEditor}
      data={data}
      onChange={(event, editor) => {
        const newData = editor.getData();
        onDataChange(newData);
      }}
    />
  );
};

export default CKEditorComponent;

CKEditorComponent.propTypes = {
  data: PropTypes.string,
  onDataChange: PropTypes.func,
};
