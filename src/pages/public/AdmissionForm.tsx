/**
 * NVRSS ERP - Public Admission Form
 * Multi-step form for new student applications
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
    // Student Info
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;

    // Academic
    applyingForGrade: number;
    preferredSection: string;
    academicYear: string;

    // Contact
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;

    // Guardian
    guardianName: string;
    guardianRelation: string;
    guardianPhone: string;
    guardianEmail: string;
    guardianOccupation: string;

    // Previous Education
    previousSchool: string;
    previousGrade: string;
    previousPercentage: string;

    // Additional
    medicalConditions: string;
    specialRequirements: string;
}

const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    applyingForGrade: 1,
    preferredSection: '',
    academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianOccupation: '',
    previousSchool: '',
    previousGrade: '',
    previousPercentage: '',
    medicalConditions: '',
    specialRequirements: '',
};

const steps = [
    { id: 1, title: 'Student Information' },
    { id: 2, title: 'Contact Details' },
    { id: 3, title: 'Guardian Information' },
    { id: 4, title: 'Academic History' },
];

export default function AdmissionForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
            if (!formData.gender) newErrors.gender = 'Gender is required';
            if (!formData.applyingForGrade) newErrors.applyingForGrade = 'Grade is required';
        }

        if (step === 2) {
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
            if (formData.phone.length < 10) newErrors.phone = 'Enter a valid phone number';
            if (!formData.address.trim()) newErrors.address = 'Address is required';
            if (!formData.city.trim()) newErrors.city = 'City is required';
            if (!formData.state.trim()) newErrors.state = 'State is required';
        }

        if (step === 3) {
            if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
            if (!formData.guardianRelation.trim()) newErrors.guardianRelation = 'Relation is required';
            if (!formData.guardianPhone.trim()) newErrors.guardianPhone = 'Guardian phone is required';
            if (formData.guardianPhone.length < 10) newErrors.guardianPhone = 'Enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        }
    };

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/admissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setApplicationId(data.applicationId);
                setIsSubmitted(true);
            } else {
                setErrors({ firstName: data.message || 'Submission failed. Please try again.' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ firstName: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="admission-page">
                <div className="admission-container">
                    <div className="success-card">
                        <div className="success-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h1>Application Submitted!</h1>
                        <p>Thank you for applying to New Vision Residential Secondary School.</p>
                        <div className="application-ref">
                            <label>Application Reference Number</label>
                            <div className="ref-number">#{applicationId?.toString().padStart(6, '0')}</div>
                        </div>
                        <p className="text-muted">
                            Please save this reference number. You will be contacted once your application is reviewed.
                        </p>
                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admission-page">
            <div className="admission-container">
                {/* Header */}
                <div className="admission-header">
                    <div className="admission-logo">NV</div>
                    <h1>Student Admission Application</h1>
                    <p>New Vision Residential Secondary School</p>
                </div>

                {/* Progress Steps */}
                <div className="steps-container">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                                <div className="step-number">
                                    {currentStep > step.id ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    ) : step.id}
                                </div>
                                <div className="step-title">{step.title}</div>
                            </div>
                            {index < steps.length - 1 && <div className={`step-line ${currentStep > step.id ? 'completed' : ''}`} />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Form */}
                <form className="admission-form" onSubmit={handleSubmit}>
                    {/* Step 1: Student Information */}
                    {currentStep === 1 && (
                        <div className="form-step">
                            <h2>Student Information</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label form-label-required">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className={`form-input ${errors.firstName ? 'error' : ''}`}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label form-label-required">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className={`form-input ${errors.lastName ? 'error' : ''}`}
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label form-label-required">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                    {errors.dateOfBirth && <span className="form-error">{errors.dateOfBirth}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label form-label-required">Gender</label>
                                    <select
                                        name="gender"
                                        className={`form-input form-select ${errors.gender ? 'error' : ''}`}
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && <span className="form-error">{errors.gender}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label form-label-required">Applying for Grade</label>
                                    <select
                                        name="applyingForGrade"
                                        className={`form-input form-select ${errors.applyingForGrade ? 'error' : ''}`}
                                        value={formData.applyingForGrade}
                                        onChange={handleChange}
                                    >
                                        {[...Array(12)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Preferred Section (optional)</label>
                                    <select
                                        name="preferredSection"
                                        className="form-input form-select"
                                        value={formData.preferredSection}
                                        onChange={handleChange}
                                    >
                                        <option value="">No Preference</option>
                                        {['A', 'B', 'C', 'D', 'E'].map((s) => (
                                            <option key={s} value={s}>Section {s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Contact Details */}
                    {currentStep === 2 && (
                        <div className="form-step">
                            <h2>Contact Details</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label form-label-required">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className={`form-input ${errors.phone ? 'error' : ''}`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email (optional)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label-required">Address</label>
                                <textarea
                                    name="address"
                                    className={`form-input form-textarea ${errors.address ? 'error' : ''}`}
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter full address"
                                    rows={3}
                                />
                                {errors.address && <span className="form-error">{errors.address}</span>}
                            </div>

                            <div className="form-row form-row-3">
                                <div className="form-group">
                                    <label className="form-label form-label-required">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className={`form-input ${errors.city ? 'error' : ''}`}
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                    {errors.city && <span className="form-error">{errors.city}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label form-label-required">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        className={`form-input ${errors.state ? 'error' : ''}`}
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                    {errors.state && <span className="form-error">{errors.state}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        className="form-input"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Guardian Information */}
                    {currentStep === 3 && (
                        <div className="form-step">
                            <h2>Guardian Information</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label form-label-required">Guardian Name</label>
                                    <input
                                        type="text"
                                        name="guardianName"
                                        className={`form-input ${errors.guardianName ? 'error' : ''}`}
                                        value={formData.guardianName}
                                        onChange={handleChange}
                                    />
                                    {errors.guardianName && <span className="form-error">{errors.guardianName}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label form-label-required">Relation</label>
                                    <select
                                        name="guardianRelation"
                                        className={`form-input form-select ${errors.guardianRelation ? 'error' : ''}`}
                                        value={formData.guardianRelation}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Relation</option>
                                        <option value="father">Father</option>
                                        <option value="mother">Mother</option>
                                        <option value="guardian">Legal Guardian</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.guardianRelation && <span className="form-error">{errors.guardianRelation}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label form-label-required">Guardian Phone</label>
                                    <input
                                        type="tel"
                                        name="guardianPhone"
                                        className={`form-input ${errors.guardianPhone ? 'error' : ''}`}
                                        value={formData.guardianPhone}
                                        onChange={handleChange}
                                    />
                                    {errors.guardianPhone && <span className="form-error">{errors.guardianPhone}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Guardian Email (optional)</label>
                                    <input
                                        type="email"
                                        name="guardianEmail"
                                        className="form-input"
                                        value={formData.guardianEmail}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Occupation (optional)</label>
                                <input
                                    type="text"
                                    name="guardianOccupation"
                                    className="form-input"
                                    value={formData.guardianOccupation}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Academic History */}
                    {currentStep === 4 && (
                        <div className="form-step">
                            <h2>Academic History & Additional Information</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Previous School (optional)</label>
                                    <input
                                        type="text"
                                        name="previousSchool"
                                        className="form-input"
                                        value={formData.previousSchool}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Previous Grade</label>
                                    <input
                                        type="text"
                                        name="previousGrade"
                                        className="form-input"
                                        value={formData.previousGrade}
                                        onChange={handleChange}
                                        placeholder="e.g., Grade 5"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Previous Percentage/Grade</label>
                                <input
                                    type="text"
                                    name="previousPercentage"
                                    className="form-input"
                                    value={formData.previousPercentage}
                                    onChange={handleChange}
                                    placeholder="e.g., 85% or A+"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Medical Conditions (optional)</label>
                                <textarea
                                    name="medicalConditions"
                                    className="form-input form-textarea"
                                    value={formData.medicalConditions}
                                    onChange={handleChange}
                                    placeholder="Please mention any medical conditions, allergies, or special health requirements..."
                                    rows={3}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Special Requirements (optional)</label>
                                <textarea
                                    name="specialRequirements"
                                    className="form-input form-textarea"
                                    value={formData.specialRequirements}
                                    onChange={handleChange}
                                    placeholder="Any special learning needs or accommodations required..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="form-actions">
                        {currentStep > 1 && (
                            <button type="button" className="btn btn-secondary" onClick={handlePrev}>
                                Previous
                            </button>
                        )}

                        {currentStep < steps.length ? (
                            <button type="button" className="btn btn-primary" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <div className="spinner"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        )}
                    </div>
                </form>

                {/* Login Link */}
                <div className="admission-footer">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>

            {/* Page Styles */}
            <style>{`
        .admission-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-neutral-100) 100%);
          padding: var(--spacing-8) var(--spacing-4);
        }

        .admission-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .admission-header {
          text-align: center;
          margin-bottom: var(--spacing-8);
        }

        .admission-logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-4);
          color: white;
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
        }

        .admission-header h1 {
          font-size: var(--text-2xl);
          margin-bottom: var(--spacing-1);
        }

        .admission-header p {
          color: var(--text-secondary);
        }

        .steps-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--spacing-8);
          gap: var(--spacing-2);
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
        }

        .step-number {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--color-neutral-200);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--font-semibold);
          font-size: var(--text-sm);
          transition: all var(--transition-base);
        }

        .step.active .step-number {
          background: var(--color-primary-600);
          color: white;
        }

        .step.completed .step-number {
          background: var(--color-success-500);
          color: white;
        }

        .step-title {
          font-size: var(--text-xs);
          color: var(--text-muted);
          text-align: center;
          max-width: 80px;
        }

        .step.active .step-title {
          color: var(--color-primary-600);
          font-weight: var(--font-medium);
        }

        .step-line {
          width: 40px;
          height: 2px;
          background: var(--color-neutral-200);
          margin-bottom: 24px;
        }

        .step-line.completed {
          background: var(--color-success-500);
        }

        .admission-form {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-8);
        }

        .form-step h2 {
          font-size: var(--text-lg);
          margin-bottom: var(--spacing-6);
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid var(--border-light);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-4);
        }

        .form-row-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: var(--spacing-8);
          padding-top: var(--spacing-6);
          border-top: 1px solid var(--border-light);
        }

        .form-actions .btn {
          min-width: 120px;
        }

        .admission-footer {
          text-align: center;
          margin-top: var(--spacing-6);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .success-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-10);
          text-align: center;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: var(--color-success-100);
          color: var(--color-success-600);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-6);
        }

        .success-card h1 {
          font-size: var(--text-2xl);
          margin-bottom: var(--spacing-2);
        }

        .success-card > p {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-6);
        }

        .application-ref {
          background: var(--color-neutral-50);
          border-radius: var(--radius-lg);
          padding: var(--spacing-4);
          margin-bottom: var(--spacing-6);
        }

        .application-ref label {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .ref-number {
          font-family: var(--font-mono);
          font-size: var(--text-3xl);
          font-weight: var(--font-bold);
          color: var(--color-primary-600);
          margin-top: var(--spacing-2);
        }

        @media (max-width: 640px) {
          .form-row,
          .form-row-3 {
            grid-template-columns: 1fr;
          }

          .steps-container {
            flex-wrap: wrap;
          }

          .step-line {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
