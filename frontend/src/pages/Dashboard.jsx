import React, { useState } from 'react';
import { TextInputField, Button, Pane, Heading, Paragraph, SelectField } from 'evergreen-ui';
// import { TextInputField, TextareaField, SelectField, Button } from 'evergreen-ui';
import UserEnergyLevelLineChart from '../components/UserEnergyLevelLineChart';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    work_start_time: "",
    work_end_time: "",
    tasks: "",
    energy_levels: [],
    exercise_routine: "",
    relationships: "",
    fun_activities: [],
    ambitions: { short_term: "", long_term: "" },
    priorities: { health: "", relationships: "", fun_activities: "", ambitions: "" },
    // break_preferences: { frequency: "", duration: "" },
    // sleep_schedule: "",
    // meal_times: { breakfast: "", lunch: "", dinner: "" },
    layout_preference: { type: "", subcategory: "" }
  });

  const [response, setResponse] = useState(null); // State for storing the response
  const [error, setError] = useState(null); // State for storing errors

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const [field, subfield] = name.split('.');
    if (subfield) {
      setFormData({
        ...formData,
        [field]: { ...formData[field], [subfield]: value }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleEnergyLevelsChange = (energyLevels) => {
    setFormData({
      ...formData,
      energy_levels: energyLevels
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Before Submission:", formData); // Log form data before submission

    fetch('http://localhost:8000/api/submit_data', {  // Replace with your actual backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Response from server:", data);
      setResponse(data.schedule); // Store the schedule in the state
      setError(null); // Clear any previous errors
    })
    .catch(error => {
      console.error("Error submitting form:", error);
      setError(error.message); // Store the error message in the state
      setResponse(null); // Clear any previous response
    });
  };

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <form style={{width: "50%"}} onSubmit={handleSubmit}>
        <TextInputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
        <TextInputField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Enter your age"
        />
        <TextInputField
          label="Work Start Time"
          name="work_start_time"
          value={formData.work_start_time}
          onChange={handleInputChange}
          placeholder="Enter your work start time (e.g., 9:00am)"
        />
        <TextInputField
          label="Work End Time"
          name="work_end_time"
          value={formData.work_end_time}
          onChange={handleInputChange}
          placeholder="Enter your work end time (e.g., 5:00pm)"
        />
        <TextInputField
          label="Tasks"
          name="tasks"
          value={formData.tasks}
          onChange={handleInputChange}
          placeholder="Enter your tasks for today from most important to least separated by a comma"
        />
        <UserEnergyLevelLineChart onChange={handleEnergyLevelsChange} />
        <TextInputField
          label="Exercise Routine"
          name="exercise_routine"
          value={formData.exercise_routine}
          onChange={handleInputChange}
          placeholder="Enter your exercise routine"
        />
        <TextInputField
          label="Relationships"
          name="relationships"
          value={formData.relationships}
          onChange={handleInputChange}
          placeholder="Enter how you manage relationships"
        />
        <TextInputField
          label="Fun Activities"
          name="fun_activities"
          value={formData.fun_activities}
          onChange={handleInputChange}
          placeholder="Enter your fun activities (comma separated)"
        />
        <TextInputField
          label="Short Term Ambitions"
          name="ambitions.short_term"
          value={formData.ambitions.short_term}
          onChange={handleInputChange}
          placeholder="What is 1 thing you'd like to achieve by the end of this month?"
        />
        <TextInputField
          label="Long Term Ambitions"
          name="ambitions.long_term"
          value={formData.ambitions.long_term}
          onChange={handleInputChange}
          placeholder="What is 1 thing  you'd like to achieve by the end of the year?"
        />
        <TextInputField
          label="Priority for Health (0-100)"
          name="priorities.health"
          type="number"
          value={formData.priorities.health}
          onChange={handleInputChange}
          placeholder="Enter priority for health"
        />
        <TextInputField
          label="Priority for Relationships (0-100)"
          name="priorities.relationships"
          type="number"
          value={formData.priorities.relationships}
          onChange={handleInputChange}
          placeholder="Enter priority for relationships"
        />
        <TextInputField
          label="Priority for Fun Activities (0-100)"
          name="priorities.fun_activities"
          type="number"
          value={formData.priorities.fun_activities}
          onChange={handleInputChange}
          placeholder="Enter priority for fun activities"
        />
        <TextInputField
          label="Priority for Ambitions (0-100)"
          name="priorities.ambitions"
          type="number"
          value={formData.priorities.ambitions}
          onChange={handleInputChange}
          placeholder="Enter priority for ambitions"
        />
        {/* <TextInputField
          label="Break Frequency"
          name="break_preferences.frequency"
          value={formData.break_preferences.frequency}
          onChange={handleInputChange}
          placeholder="Enter your break frequency"
        />
        <TextInputField
          label="Break Duration"
          name="break_preferences.duration"
          value={formData.break_preferences.duration}
          onChange={handleInputChange}
          placeholder="Enter your break duration"
        />
        <TextInputField
          label="Sleep Schedule"
          name="sleep_schedule"
          value={formData.sleep_schedule}
          onChange={handleInputChange}
          placeholder="Enter your sleep schedule"
        />
        <TextInputField
          label="Breakfast Time"
          name="meal_times.breakfast"
          value={formData.meal_times.breakfast}
          onChange={handleInputChange}
          placeholder="Enter your breakfast time"
        />
        <TextInputField
          label="Lunch Time"
          name="meal_times.lunch"
          value={formData.meal_times.lunch}
          onChange={handleInputChange}
          placeholder="Enter your lunch time"
        />
        <TextInputField
          label="Dinner Time"
          name="meal_times.dinner"
          value={formData.meal_times.dinner}
          onChange={handleInputChange}
          placeholder="Enter your dinner time"
        /> */}
        <SelectField
          label="Planner Layout Preference"
          name="layout_preference.type"
          value={formData.layout_preference.type}
          onChange={handleInputChange}
        >
          <option value="kanban">Kanban</option>
          <option value="to-do-list">To-do List</option>
        </SelectField>
        {formData.layout_preference.type === 'to-do-list' && (
          <SelectField
            label="To-do List Subcategory"
            name="layout_preference.subcategory"
            value={formData.layout_preference.subcategory}
            onChange={handleInputChange}
          >
            <option value="structured and time-boxed">Structured and Time-Boxed</option>
            <option value="structured and un-time-boxed">Structured and Un-Time-Boxed</option>
            <option value="unstructured and time-boxed">Unstructured and Time-Boxed</option>
            <option value="unstructured and un-time-boxed">Unstructured and Un-Time-Boxed</option>
          </SelectField>
        )}
        <Button type="submit">Submit</Button>
      </form>
      {response && (
        <Pane marginTop={20}>
          <Heading size={600}>Generated Schedule</Heading>
          <Paragraph>{response}</Paragraph>
        </Pane>
      )}
      {error && (
        <Pane marginTop={20}>
          <Heading size={600} color="red">Error</Heading>
          <Paragraph>{error}</Paragraph>
        </Pane>
      )}
    </div>
  );
};

export default Dashboard;
