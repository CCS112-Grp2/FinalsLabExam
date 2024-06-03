Use Case: Hospital Management System
Objective:

To create a Hospital Management System where students can practice developing a web application
using Laravel for the backend API and React for the frontend. This system will manage patients, doctors,
appointments, and medical records.
Use Case Description:

Title: Hospital Management System

Actors:

 Admin: Manages the system, doctors, and patients.
 Doctor: Views patient records and manages appointments.
 Patient: Books appointments and views their medical records.

Functional Requirements:

1. User Authentication:
 Admin: Can add, edit, and delete doctors and patients.
 Doctor: Can view and update patient records and manage their own appointments.
 Patient: Can register, book appointments, and view their own medical records.

2. Patient Management:
 Admin: Can add, edit, and delete patient records.
 Doctor: Can view and update patient records.
 Patient: Can view their own records.

3. Doctor Management:
 Admin: Can add, edit, and delete doctor records.
 Doctor: Can update their own profile and view their appointments.

4. Appointment Management:
 Admin: Can view all appointments.
 Doctor: Can manage their own appointments.
 Patient: Can book, view, and cancel their appointments.

5. Medical Records:
 Admin: Can view all medical records.
 Doctor: Can update patient medical records.
 Patient: Can view their own medical records.

Technology Stack:
 Backend: Laravel
 Frontend: React
 Database: MySQL

User Stories

1. User Registration and Authentication
 As a user, I want to create an account, so that I can access the hospital management
system.
 As a user, I want to log in using my credentials, so that I can access my personal dashboard.
 As an admin, I want to manage user roles and permissions, so that I can control access to
different parts of the system.

2. Managing Patients
 As a receptionist, I want to add new patient details, so that I can keep accurate records of
all patients.
 As a receptionist, I want to edit existing patient details, so that I can update information as
needed.
 As a doctor, I want to view a list of all patients, so that I can quickly find and manage patient
information.
 As a patient, I want to view my medical records, so that I can keep track of my health history.

3. Managing Doctors
 As an admin, I want to add new doctors to the system, so that they can manage patient
appointments and records.
 As an admin, I want to edit doctor details, so that I can update their information as needed.
 As a user, I want to view a list of all doctors, so that I can find and contact specific doctors.

4. Appointments
 As a patient, I want to book an appointment with a doctor, so that I can receive medical
consultation.
 As a receptionist, I want to schedule appointments for patients, so that they can see a
doctor at a specific time.
 As a doctor, I want to view my schedule of appointments, so that I can plan my day
accordingly.
 As a patient, I want to cancel or reschedule my appointment, so that I can manage my time
better.

5. Medical Records
 As a doctor, I want to add and update medical records for patients, so that their health
history is accurately recorded.
 As a doctor, I want to view a patient&#39;s medical records, so that I can provide informed
medical advice.
 As a patient, I want to view my own medical records, so that I can stay informed about my
health status.

Model and Their Attributes

1. User
 id: Unique identifier for the user
 name: Full name of the user
 email: Email address of the user
 password: Hashed password for user authentication
 role: Role of the user (e.g., admin, doctor, receptionist, patient)
 created_at: Timestamp when the user account was created
 updated_at: Timestamp when the user account was last updated

2. Patient
 id: Unique identifier for the patient
 first_name: First name of the patient
 last_name: Last name of the patient
 date_of_birth: Date of birth of the patient
 gender: Gender of the patient
 address: Residential address of the patient
 phone: Contact number of the patient
 email: Email address of the patient
 emergency_contact: Emergency contact details
 medical_history: Brief medical history of the patient
 created_at: Timestamp when the patient record was created
 updated_at: Timestamp when the patient record was last updated

3. Doctor
 id: Unique identifier for the doctor
 first_name: First name of the doctor
 last_name: Last name of the doctor
 specialization: Medical specialization of the doctor
 license_number: Medical license number
 phone: Contact number of the doctor
 email: Email address of the doctor
 created_at: Timestamp when the doctor record was created
 updated_at: Timestamp when the doctor record was last updated

4. Appointment
 id: Unique identifier for the appointment
 patient_id: Reference to the patient who booked the appointment
 doctor_id: Reference to the doctor with whom the appointment is booked
 appointment_date: Date and time of the appointment
 status: Status of the appointment (e.g., scheduled, completed, cancelled)
 reason: Reason for the appointment
 created_at: Timestamp when the appointment was created
 updated_at: Timestamp when the appointment was last updated

5. Medical Record
 id: Unique identifier for the medical record
 patient_id: Reference to the patient to whom the medical record belongs
 doctor_id: Reference to the doctor who created the medical record
 visit_date: Date of the patient&#39;s visit
 diagnosis: Diagnosis made by the doctor
 treatment: Treatment prescribed to the patient
 notes: Additional notes by the doctor
 created_at: Timestamp when the medical record was created
 updated_at: Timestamp when the medical record was last updated
