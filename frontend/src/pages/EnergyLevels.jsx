import React from 'react';
import { Button, Pane } from 'evergreen-ui';
import UserEnergyLevelLineChart from '../components/UserEnergyLevelLineChart';
import { useNavigate } from 'react-router-dom';
import CenteredPane from '../components/CentredPane';

const EnergyLevels = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleEnergyLevelsChange = (energyLevels) => {
    setFormData(prevData => ({
      ...prevData,
      energy_levels: energyLevels
    }));
  };

  const handleNext = () => {
    navigate('/exercise-routine');
  };

  const handlePrevious = () => {
    navigate('/tasks');
  };

  return (
    <CenteredPane>
      <UserEnergyLevelLineChart onChange={handleEnergyLevelsChange} />
      <Pane display="flex" justifyContent="space-between" marginTop={20}>
        <Button onClick={handlePrevious}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Pane>
    </CenteredPane>
  );
};

export default EnergyLevels;
