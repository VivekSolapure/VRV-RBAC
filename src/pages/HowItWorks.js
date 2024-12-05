import React from 'react';
import Step from '../components/Step';
import './HowItWorks.css'

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h1>How it Works</h1>
      <p>A simple guide to our user management system.</p>
      <div className="steps">
        <Step number={1} title="Fetch User Data" description="Our system retrieves user information from a Firebase Realtime Database." />
        <Step number={2} title="Filter Users" description="You can filter users by name, role, and status to find specific users." />
        <Step number={3} title="Manage Users" description="Edit existing users or create new ones with desired titles, roles, and statuses." />
        <Step number={4} title="Delete Users" description="Remove unwanted users from the system." />
      </div>
    </div>
  );
}

export default HowItWorks;