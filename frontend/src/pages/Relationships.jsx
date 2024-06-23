import React from 'react';
import { TextInputField, Button, Pane } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { handleSimpleInputChange } from '../helper.jsx';
import CenteredPane from '../components/CentredPane';

const Relationships = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleInputChange = handleSimpleInputChange(setFormData);

  const handleNext = () => {
    navigate('/fun-activities');
  };

  const handlePrevious = () => {
    navigate('/exercise-routine');
  };

  return (
    <CenteredPane>
      <TextInputField
        label="Relationships"
        name="relationships"
        value={formData.relationships}
        onChange={handleInputChange}
        placeholder="Enter how you manage relationships"
      />
      <Pane display="flex" justifyContent="space-between" marginTop={20}>
        <Button onClick={handlePrevious}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Pane>
    </CenteredPane>
  );
};

export default Relationships;
